import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import * as Layout from './forms/Layout';
import {
    ConditionalCollapsibleRender,
    ConditionalRender,
    IntraSectionDivider,
    IntraSectionInvisibleDivider
} from "./forms/Layout";
import * as Data from './Data';
import {ChipBox, DefaultSwitchRow} from "./forms/ContextSpecificComponents";
import {WeeklyDosagePicker} from "./forms/WeeklyDosagePicker";
import {visitDao} from "../../../../data/dao/VisitDao";
import {firstNonEmpty, getDayOfWeekName} from "../../../../../root/domain/util/Util";
import ListUtil from "../../../../../root/domain/util/ListUtil";
import {FirstVisit} from "../../../../domain/visit/Visit";

export class PreliminaryStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    componentDidMount() {

    }

    render() {

        return (
            <Layout.VisitScreen
            >
                <Layout.ScreenTitle title={'Warfarin Usage'}/>
                <ReasonForWarfarinPicker {...this.props.route.params}/>

                <Layout.IntraSectionDivider m/>

                <HeartValveReplacementConditions {...this.props.route.params}/>

                <Layout.IntraSectionDivider m/>

                <FirstTimeWarfarinForm {...this.props.route.params}/>

                <IntraSectionInvisibleDivider/>
            </Layout.VisitScreen>

        )
    }
}

const ReasonForWarfarinPicker = (props) => {

    let medicalConditions = useRef([...Data.PreliminaryStage.REASON_FOR_WARFARIN_CONDITIONS]);
    let visit = useRef({});

    let [loaded, setLoaded] = useState(false);
    useEffect(() => {
        visit.current = visitDao.getVisits(props.userId);
        medicalConditions.current.forEach(condition => {
            const isConditionListed = ListUtil.findOneById(visit.current.warfarinInfo.reasonForWarfarin.conditions, condition.id) != null;
            condition['value'] = isConditionListed;
        });
        setLoaded(true);
    }, []);

    const changeValue = (id, value) => {

        if (value) {
            const condition = ListUtil.findOneById(medicalConditions.current, id);
            ListUtil.addById(visit.current.warfarinInfo.reasonForWarfarin.conditions, condition)
        }
        else {
            ListUtil.removeById(visit.current.warfarinInfo.reasonForWarfarin.conditions, id);
        }

    };

    return (
        <View>
            <Layout.InputTitle title={'Reason for Using Warfarin'} description={null}/>
            <Layout.InputArea>
                <ConditionalRender hidden={false}>
                    <ChipBox items={medicalConditions.current} onChange={changeValue} disableAll={props.readonly} key={`ReasonForWarfarinLD${loaded}`}/>
                </ConditionalRender>
            </Layout.InputArea>
        </View>
    );
}

const HeartValveReplacementConditions = (props) => {
    let medicalConditions = useRef([...Data.PreliminaryStage.HEART_VALVE_REPLACEMENT_CONDITIONS]);

    let [value, setValue] = useState(false);
    let visit = useRef({});

    let [loaded, setLoaded] = useState(false);
    useEffect(() => {
        visit.current = visitDao.getVisits(props.userId);
        const heartValveConditions = visit.current.warfarinInfo.reasonForWarfarin.heartValveReplacementConditions;
        setValue((heartValveConditions || []).length > 0);
        medicalConditions.current.forEach(condition => {
            const isConditionListed = ListUtil.findOneById(heartValveConditions, condition.id) != null;
            condition['value'] = isConditionListed;
        });
        setLoaded(true);
    }, [value]);


    let changeConditionStatus = (id, value) => {
        const heartValveConditions = visit.current.warfarinInfo.reasonForWarfarin.heartValveReplacementConditions;

        if (value) {
            const condition = ListUtil.findOneById(medicalConditions.current, id);
            ListUtil.addById(heartValveConditions, condition)
        }
        else {
            ListUtil.removeById(heartValveConditions, id);
        }
    }

    let changeEnableSwitch = (value) => {
        if (value == false) {
            visit.current.warfarinInfo.reasonForWarfarin.heartValveReplacementConditions = [];
        }
        setValue(value);
    }

    return (
        <View key={`HeartValveContainerLD${loaded}`}>
            <DefaultSwitchRow
                value={value}
                onFlip={changeEnableSwitch}
                title={'Cardiac Valve Replacement'}
                disabled={props.readonly}
            />
            <ConditionalCollapsibleRender hidden={!value || !loaded}>
                <Layout.InputArea>
                    <ChipBox items={medicalConditions.current} onChange={changeConditionStatus} disableAll={props.readonly}/>
                </Layout.InputArea>
            </ConditionalCollapsibleRender>
        </View>
    );
}

const FirstTimeWarfarinForm = (props) => {
    let [firstTimeWarfarin, setFirstTimeWarfarin] = useState(true);
    let [loaded, setLoaded] = useState(false);

    let visit = useRef({});
    useEffect(() => {
        visit.current = visitDao.getVisits(props.userId);
        setFirstTimeWarfarin(firstNonEmpty(visit.current.warfarinInfo.firstTimeWarfarin, true));
        visit.current.warfarinInfo.lastWarfarinDosage = visit.current.warfarinInfo.lastWarfarinDosage || FirstVisit.createNew().warfarinInfo.lastWarfarinDosage;
        setLoaded(true);
    }, []);

    const onDoseUpdate = (day, dose) => {
        visit.current.warfarinInfo.lastWarfarinDosage[day] = dose;
    }

    const getDayOrder = () => {
        let dayOrder = [];
        let date = new Date();
        const dayOfWeekOffset = date.getDay();
        for (let i = 0; i < 7; i++) {
            const dayOfWeekName = getDayOfWeekName((dayOfWeekOffset + 7) - i);
            dayOrder.push(dayOfWeekName);
        }
        return dayOrder;
    }

    return (
        <View key={`LastDosage_LD${loaded}`}>
            <DefaultSwitchRow
                value={firstTimeWarfarin}
                onFlip={() => {visit.current.warfarinInfo.firstTimeWarfarin= !firstTimeWarfarin; setFirstTimeWarfarin(!firstTimeWarfarin)}}
                title={'No Prior Warfarin Usage'}
                description={'Is this the first time for using warfarin?'}
                disabled={props.readonly}
            />
            <ConditionalCollapsibleRender hidden={firstTimeWarfarin || !loaded}>
                <Layout.FormSection>
                    <IntraSectionDivider s/>
                    <Layout.InputTitle title={'Last Warfarin Dosage'} description={'Please specify the last dosage that patient used.'}/>
                    <WeeklyDosagePicker
                        initialData={loaded ? visit.current.warfarinInfo.lastWarfarinDosage : {}}
                        dayOrder={getDayOrder()}
                        onDoseUpdate={onDoseUpdate}
                        disabled={props.readonly}
                    />
                </Layout.FormSection>
            </ConditionalCollapsibleRender>
        </View>
    );
}


const styles = StyleSheet.create({
})