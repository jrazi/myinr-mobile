import React, {useState} from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import {Text, Chip, Switch, Divider} from "react-native-paper";
import {currentTheme, theme} from "../../../../../../theme";
import * as Layout from './forms/Layout';
import {BasicElement, ConditionalRender, FormSection, IntraSectionInvisibleDivider, SectionTitle} from "./forms/Layout";
import CircularPicker from 'react-native-circular-picker';
import {firstNonEmpty, getFormattedJalaliDate, hasValue} from "../../../../../root/domain/util/Util";
import * as Data from './Data';
import {ChipBox, DefaultSwitchRow} from "./forms/ContextSpecificComponents";
import {WeeklyDosagePicker} from "./forms/WeeklyDosagePicker";

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
                <ReasonForWarfarinPicker/>

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
    return (
        <View>
            <Layout.InputTitle title={'دلیل مصرف وارفارین'} description={'لطفا دلایل مصرف وارفارین توسط بیمار را مشخص کنید.'}/>
            <Layout.InputArea>
                <ChipBox items={medicalConditions}/>
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
    wrapper: {
        backgroundColor: currentTheme.colors.surface,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: currentTheme.colors.surface,
    }
})