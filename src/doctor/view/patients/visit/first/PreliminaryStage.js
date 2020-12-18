import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import * as Layout from './forms/Layout';
import {ConditionalRender, IntraSectionInvisibleDivider} from "./forms/Layout";
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
                <Layout.ScreenTitle title={'اطلاعات اولیه'}/>
                <ReasonForWarfarinPicker userId={this.props.route.params.userId}/>

                <Layout.IntraSectionDivider m/>

                <HeartValveReplacementConditions userId={this.props.route.params.userId}/>

                <Layout.IntraSectionDivider m/>

                <FirstTimeWarfarinForm userId={this.props.route.params.userId}/>

                <IntraSectionInvisibleDivider/>
            </Layout.VisitScreen>

        )
    }
}

const ReasonForWarfarinPicker = (props) => {
    let medicalConditions = Data.PreliminaryStage.REASON_FOR_WARFARIN_CONDITIONS;
    medicalConditions.forEach(condition => condition['value'] = false);
    let visit = useRef({});

    let [loaded, setLoaded] = useState(false);
    useEffect(() => {
        visit.current = visitDao.getVisits(props.userId);
        medicalConditions.forEach(condition => {
            condition['value'] = firstNonEmpty(visit.current.reasonForWarfarin[condition.id], false);
        });
        setLoaded(true);
    }, []);

    const changeValue = (id, value) => {visit.current.reasonForWarfarin[id] = value};

    return (
        <View>
            <Layout.InputTitle title={'دلیل مصرف وارفارین'} description={'لطفا دلایل مصرف وارفارین توسط بیمار را مشخص کنید.'}/>
            <Layout.InputArea>
                <ConditionalRender hidden={false}>
                    <ChipBox items={medicalConditions} onChange={changeValue}/>
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
        <View>
            <DefaultSwitchRow value={value} onFlip={(val) => {visit.current.heartValveReplacementCondition.replaced = val; setValue(val)}} title={'تعویض دریچه قلب'}/>
            <ConditionalRender hidden={!value || !loaded}>
                <Layout.InputArea>
                    <ChipBox items={medicalConditions.current} onChange={changeConditionStatus}/>
                </Layout.InputArea>
            </ConditionalRender>
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
                title={'نخستین تجویز وارفارین'}
                description={'آیا این نخستین تجربه مصرف وارفارین است؟'}
            />
            <ConditionalRender hidden={firstTimeWarfarin || !loaded}>
                <Layout.FormSection>
                    <Layout.SectionTitle title={'اطلاعات آخرین دوز مصرفی'} description={'در صورت استفاده از وارفارین،‌ لطفا دوز مصرفی بیمار در هفته اخیر را وارد کنید.'}/>
                    <WeeklyDosagePicker initialData={loaded ? visit.current.firstWarfarin.weeklyDosage : []} doseData={[]} onDoseUpdate={onDoseUpdate}/>
                </Layout.FormSection>
            </ConditionalRender>
        </View>
    );
}


const styles = StyleSheet.create({
})