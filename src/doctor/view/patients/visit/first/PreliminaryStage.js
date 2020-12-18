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

                <HeartValveReplacementConditions/>

                <Layout.IntraSectionDivider m/>

                <FirstTimeWarfarinForm/>

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
    let medicalConditions = Data.PreliminaryStage.HEART_VALVE_REPLACEMENT_CONDITIONS;
    let [value, setValue] = useState(false);
    return (
        <View>
            <DefaultSwitchRow value={value} onFlip={setValue} title={'تعویض دریچه قلب'}/>
            <ConditionalRender hidden={!value}>
                <Layout.InputArea>
                    <ChipBox items={medicalConditions}/>
                </Layout.InputArea>
            </ConditionalRender>
        </View>
    );
}

const FirstTimeWarfarinForm = (props) => {
    let [firstTimeWarfarin, setFirstTimeWarfarin] = useState(true);
    return (
        <View>
            <DefaultSwitchRow
                value={firstTimeWarfarin}
                onFlip={() => setFirstTimeWarfarin(!firstTimeWarfarin)}
                title={'نخستین تجویز وارفارین'}
                description={'آیا این نخستین تجربه مصرف وارفارین است؟'}
            />
            <ConditionalRender hidden={firstTimeWarfarin}>
                <Layout.FormSection>
                    <Layout.SectionTitle title={'اطلاعات آخرین دوز مصرفی'} description={'در صورت استفاده از وارفارین،‌ لطفا دوز مصرفی بیمار در هفته اخیر را وارد کنید.'}/>
                    <WeeklyDosagePicker doseData={[]} onDoseUpdate={() => {}}/>
                </Layout.FormSection>
            </ConditionalRender>
        </View>
    );
}


const styles = StyleSheet.create({
})