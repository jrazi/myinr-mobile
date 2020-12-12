import React from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import {Text, Chip, Switch, Divider} from "react-native-paper";
import {currentTheme} from "../../../../../../theme";
import * as Layout from './Layout';
import {BasicElement, IntraSectionInvisibleDivider, SectionTitle} from "./Layout";

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
            <Layout.VisitScreen>
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


const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: currentTheme.colors.surface,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: currentTheme.colors.surface,
    }
})