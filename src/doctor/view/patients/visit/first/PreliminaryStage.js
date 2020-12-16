import React, {useState} from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import {Text, Chip, Switch, Divider} from "react-native-paper";
import {currentTheme, theme} from "../../../../../../theme";
import * as Layout from './forms/Layout';
import {BasicElement, ConditionalRender, FormSection, IntraSectionInvisibleDivider, SectionTitle} from "./forms/Layout";
// import CircleSlider from "react-native-circle-slider";
import CircularPicker from 'react-native-circular-picker';
import {firstNonEmpty, getFormattedJalaliDate, hasValue} from "../../../../../root/domain/util/Util";
import * as Data from './Data';
import {ChipBox, DefaultSwitchRow} from "./forms/ContextSpecificComponents";
import Condition from "yup/lib/Condition";

export class PreliminaryStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reasonForWarfarin: [false, false, false, false],
            valveReplaced: false,
            reasonForValveReplacement: [false, false, false],
            firstTimeWarfarin: true,
            firstTimeDoseData: [{}, {}, {}, {}, {}, {}, {}]
        }
    }

    reasonForWarfarinItemToggled = (itemId) => {
        this.state.reasonForWarfarin[itemId] = !this.state.reasonForWarfarin[itemId];
        this.setState(this.state);
    }

    valveReplacedTriggered = () => {
        this.setState({valveReplaced: !this.state.valveReplaced});
    }

    firstWarfarinToggled = () => {
        this.setState({firstTimeWarfarin: !this.state.firstTimeWarfarin});
    }

    reasonForValveReplacementTriggered = (itemId) => {
        this.state.reasonForValveReplacement[itemId] = !this.state.reasonForValveReplacement[itemId];
        this.setState(this.state);
    }

    updateFirstTimeDose = (id, date, dose) => {
        this.state.firstTimeDoseData[id] = {
            // date: date,
            dose: dose,
        }
        this.setState({firstTimeDoseData: this.state.firstTimeDoseData});
    }

    componentDidMount() {
    }

    render() {
        return (
            <Layout.VisitScreen
            >
                <Layout.ScreenTitle title={'اطلاعات اولیه'}/>

                <Layout.FormSection>
                    <Layout.InputTitle title={'دلیل مصرف وارفارین'} description={'لطفا دلایل مصرف وارفارین توسط بیمار را مشخص کنید.'}/>
                    <ReasonForWarfarinPicker/>
                    <Layout.IntraSectionInvisibleDivider s/>
                    <HeartValveReplacementConditions/>
                    <Layout.IntraSectionDivider m/>
                </Layout.FormSection>
                <FirstTimeWarfarinForm/>
                <IntraSectionInvisibleDivider/>
            </Layout.VisitScreen>

        )
    }
}

const ReasonForWarfarinPicker = (props) => {
    let medicalConditions = Data.PreliminaryStage.REASON_FOR_WARFARIN_CONDITIONS;
    return (
        <Layout.InputArea>
            <ChipBox items={medicalConditions}/>
        </Layout.InputArea>
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

const WeeklyDosagePicker = (props) => {
    let dosageElements = [];
    let now = Date.now();
    for (let i = 0; i < 7; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        dosageElements.push(
            <DosageForDay
                date={date}
                key={'DosageForDay' + i}
                onChange={(dose) => {}}
                dose={0}
            />
        )
    }

    const DosageElemRow = (props) => {return ([
        <Layout.Row justifyBetween style={{}}>
            {props.items}
        </Layout.Row>,
        <IntraSectionInvisibleDivider s/>
    ])};

    return (
        <Layout.FormSection>
            <DosageElemRow items={dosageElements.slice(0, 2)}/>
            <DosageElemRow items={dosageElements.slice(2, 4)}/>
            <DosageElemRow items={dosageElements.slice(4, 6)}/>
            <DosageElemRow items={dosageElements.slice(6, 7)}/>
        </Layout.FormSection>
    );
}

const DosageForDay = (props) => {
    let unit = 2.5;
    let steps = [];

    for (let u = 0; u <= 100 ; u += unit*2.5) {
        steps.push(u);
    }

    const [percentage, setPercentage] = useState(null);

    const handleChange = (v) => {
        setPercentage(v);
        // props.onChange(v);
    }

    const currentDose = firstNonEmpty(percentage, props.dose, 0)
    return (
        <CircularPicker
            size={140}
            strokeWidth={15}
            steps={steps}
            gradients={{
                0: [currentTheme.colors.primary, currentTheme.colors.primary],
                100: [currentTheme.colors.primary, currentTheme.colors.primary],
            }}
            perc={currentDose}
            onChange={handleChange}
        >
            <>
                <Text style={{ textAlign: 'center', fontSize: 12, marginBottom: 8 }}>{`${(currentDose/2.5).toFixed(2)} mg`}</Text>
                <Text style={{ textAlign: 'center' , fontSize: 12}}>{getFormattedJalaliDate(props.date)}</Text>
            </>
        </CircularPicker>
    )
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