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
import {firstNonEmpty} from "../../../../../root/domain/util/Util";

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
    let medicalConditions = useRef(Data.PreliminaryStage.REASON_FOR_WARFARIN_CONDITIONS);
    let visit = useRef({});

    let [loaded, setLoaded] = useState(false);
    useEffect(() => {
        visit.current = visitDao.getVisits(props.userId);
        console.log('PreliminaryRESON', visit.current.reasonForWarfarin, visit.current.reasonForWarfarin[1], visit.current.reasonForWarfarin['1'])
        medicalConditions.current.forEach(condition => {
            condition['value'] = firstNonEmpty(visit.current.reasonForWarfarin[condition.id], false);
        });
        setLoaded(true);
    }, []);

    const changeValue = (id, value) => {visit.current.reasonForWarfarin[id] = value};

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
    let medicalConditions = useRef(Data.PreliminaryStage.HEART_VALVE_REPLACEMENT_CONDITIONS);

    let [value, setValue] = useState(false);
    let visit = useRef({});

    let [loaded, setLoaded] = useState(false);
    useEffect(() => {
        visit.current = visitDao.getVisits(props.userId);
        setValue(firstNonEmpty(visit.current.heartValveReplacementCondition.replaced, false));
        medicalConditions.current.forEach(condition => {
            condition['value'] = firstNonEmpty(visit.current.heartValveReplacementCondition.conditionType[condition.id], false);
        });
        setLoaded(true);
    }, [value]);


    let changeConditionStatus = (id, val) => {
        visit.current.heartValveReplacementCondition.conditionType[id] = val;
    }

    return (
        <View key={`HeartValveContainerLD${loaded}`}>
            <DefaultSwitchRow
                value={value}
                onFlip={(val) => {visit.current.heartValveReplacementCondition.replaced = val; setValue(val)}}
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
        setFirstTimeWarfarin(firstNonEmpty(visit.current.firstWarfarin.isFirstTime, true));
        setLoaded(true);
    }, []);

    const onDoseUpdate = (day, dose) => {
        visit.current.firstWarfarin.weeklyDosage[day] = dose;
    }

    return (
        <View>
            <DefaultSwitchRow
                value={firstTimeWarfarin}
                onFlip={() => {visit.current.firstWarfarin.isFirstTime= !firstTimeWarfarin; setFirstTimeWarfarin(!firstTimeWarfarin)}}
                title={'No Prior Warfarin Usage'}
                description={'Is this the first time for using warfarin?'}
                disabled={props.readonly}
            />
            <ConditionalCollapsibleRender hidden={firstTimeWarfarin || !loaded}>
                <Layout.FormSection>
                    <IntraSectionDivider s/>
                    <Layout.InputTitle title={'Last Warfarin Dosage'} description={'Please specify the last dosage that patient used.'}/>
                    <WeeklyDosagePicker
                        initialData={loaded ? visit.current.firstWarfarin.weeklyDosage : []} doseData={[]}
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