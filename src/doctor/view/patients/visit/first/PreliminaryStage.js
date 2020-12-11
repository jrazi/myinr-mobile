import React from "react";
import {StyleSheet, View} from "react-native";
import {Text, Chip} from "react-native-paper";
import {currentTheme} from "../../../../../../theme";
import * as Layout from './Layout';
import {BasicElement} from "./Layout";

export class PreliminaryStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reasonForWarfarin: [false, false, false, false],
        }
    }

    reasonForWarfarinItemToggled = (itemId) => {
        this.state.reasonForWarfarin[itemId] = !this.state.reasonForWarfarin[itemId];
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
                </Layout.FormSection>
                <Layout.FormSection>
                    <Layout.SectionTitle title={'اطلاعات آخرین دوز مصرفی'} description={'در صورتی که بیمار در هفته اخیر از وارفارین استفاده کرده، لطفا میزان دوز مصرفی را مشخص کنید.'}/>
                </Layout.FormSection>
            </Layout.VisitScreen>
        )
    }
}

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