import React, {useState} from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import {Text, Chip, Switch, Divider} from "react-native-paper";
import {currentTheme, theme} from "../../../../../../theme";
import * as Layout from './Layout';
import {BasicElement, FormSection, IntraSectionInvisibleDivider, SectionTitle} from "./Layout";
// import CircleSlider from "react-native-circle-slider";
import CircularPicker from 'react-native-circular-picker';
import {getFormattedJalaliDate} from "../../../../../root/domain/util/Util";

export class PreliminaryStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reasonForWarfarin: [false, false, false, false],
            valveReplaced: false,
            reasonForValveReplacement: [false, false, false],
            firstTimeWarfarin: true,
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

    componentDidMount() {
    }

    render() {
        return (
            <Layout.VisitScreen
            >
                <Layout.ScreenTitle title={'اطلاعات اولیه'}/>

                <Layout.FormSection>
                    <Layout.SectionTitle title={'دلیل مصرف وارفارین'} description={'لطفا دلایل مصرف وارفارین توسط بیمار را مشخص کنید.'}/>
                    <Layout.InputArea>
                        <Layout.ItemsBox>
                            <ConditionSelectChip
                                title={"DVT"}
                                id={0}
                                onPress={this.reasonForWarfarinItemToggled}
                                selected={this.state.reasonForWarfarin[0]}
                            />
                            <ConditionSelectChip
                                title={"Non Valvular AF"}
                                id={1}
                                onPress={this.reasonForWarfarinItemToggled}
                                selected={this.state.reasonForWarfarin[1]}
                            />
                            <ConditionSelectChip
                                title={"Pulmonary Embolism"}
                                id={2}
                                onPress={this.reasonForWarfarinItemToggled}
                                selected={this.state.reasonForWarfarin[2]}
                            />
                            <ConditionSelectChip
                                title={"Post-myocardial Infarction"}
                                id={3}
                                onPress={this.reasonForWarfarinItemToggled}
                                selected={this.state.reasonForWarfarin[3]}
                            />
                        </Layout.ItemsBox>
                    </Layout.InputArea>
                    <Layout.IntraSectionInvisibleDivider/>
                    <Layout.Row justifyBetween style={{paddingBottom: 10}}>
                        <Layout.InputTitle title={'تعویض دریچه قلب'}/>
                        <Switch
                            style={{}} value={this.state.valveReplaced}
                            color={currentTheme.colors.primary}
                            onValueChange={() => this.valveReplacedTriggered()}
                        />
                    </Layout.Row>
                            {
                                !this.state.valveReplaced ? null :
                                    <Layout.InputArea>
                                        <Layout.ItemsBox>
                                            <ConditionSelectChip
                                                title={"MVR"}
                                                id={0}
                                                onPress={this.reasonForValveReplacementTriggered}
                                                selected={this.state.reasonForValveReplacement[0]}
                                            />
                                            <ConditionSelectChip
                                            title={"AVR"}
                                            id={1}
                                            onPress={this.reasonForValveReplacementTriggered}
                                            selected={this.state.reasonForValveReplacement[1]}
                                            />
                                            <ConditionSelectChip
                                            title={"TVR"}
                                            id={2}
                                            onPress={this.reasonForValveReplacementTriggered}
                                            selected={this.state.reasonForValveReplacement[2]}
                                            />
                                        </Layout.ItemsBox>
                                    </Layout.InputArea>
                            }
                    <Layout.IntraSectionDivider s/>
                    {/*<Divider/>*/}
                    <Layout.Row justifyBetween>
                        <Layout.InputTitle title={'نخستین تجویز وارفارین'} description={'آیا این نخستین تجربه مصرف وارفارین است؟'}/>
                        <Switch
                            style={{}}
                            value={this.state.firstTimeWarfarin}
                            color={currentTheme.colors.primary}
                            onValueChange={() => this.firstWarfarinToggled()}
                        />
                    </Layout.Row>
                </Layout.FormSection>
                {
                    !this.state.firstTimeWarfarin ? null :
                        <Layout.FormSection>
                            <Layout.SectionTitle title={'اطلاعات آخرین دوز مصرفی'} description={'در صورت استفاده از وارفارین،‌ لطفا دوز مصرفی بیمار در هفته اخیر را وارد کنید.'}/>
                            <WeeklyDosagePicker/>
                        </Layout.FormSection>
                }
                <IntraSectionInvisibleDivider/>
            </Layout.VisitScreen>

        )
    }
}

const IsoSwitch = () => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return <Switch style={{fontSize: 40}} value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

const ConditionSelectChip = (props) => {return (
    <Layout.BasicElement>
        <Chip
            selected={props.selected} icon="information" onPress={() => props.onPress(props.id)}
        >
            {props.title}
        </Chip>
    </Layout.BasicElement>
)}

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

    const [dose, setDose] = useState(0);
    const handleChange = (v) => setDose((v/2.5).toFixed(2));

    return (
        <CircularPicker
            size={140}
            strokeWidth={15}
            defaultPos={steps[0]}
            steps={steps}
            gradients={{
                0: [currentTheme.colors.primary, currentTheme.colors.primary],
            }}
            onChange={handleChange}
        >
            <>
                <Text style={{ textAlign: 'center', fontSize: 12, marginBottom: 8 }}>{`${dose} mg`}</Text>
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