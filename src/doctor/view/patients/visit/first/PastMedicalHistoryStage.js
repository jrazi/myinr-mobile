
import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {currentTheme} from "../../../../../../theme";
import * as Layout from "./forms/Layout";
import {DefaultChip, IntraSectionDivider, IntraSectionInvisibleDivider, ItemsBox} from "./forms/Layout";


export class PastMedicalHistoryStage extends React.Component {
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
                <Layout.ScreenTitle title={'سوابق پزشکی و دارویی'}/>
                <Layout.FormSection>
                    <Layout.InputTitle title={'سوابق پزشکی بیمار'}/>
                    <IntraSectionInvisibleDivider xs/>
                    <MedicalHistoryChipBox/>
                </Layout.FormSection>
                <IntraSectionDivider m/>
                <Layout.FormSection>
                    <Layout.InputTitle title={'سوابق دارویی'}/>
                    <DrugHistoryController/>
                </Layout.FormSection>
            </Layout.VisitScreen>
        );
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: currentTheme.colors.surface,
    }
})

export const MedicalHistoryChipBox = (props) => {
    let selectedStates = [];
    let chips = medicalConditions
        .sort((a, b) => a.title.length - b.title.length)
        .map(condition => {
        const [value, setValue] = useState(false);
        selectedStates.push([value, setValue]);
        return <Layout.DefaultChip selected={value} onPress={() => setValue(!value)} title={condition.title} key={condition.title}/>
    })
    return (
        <Layout.InputArea>
            <Layout.ItemsBox>
                {chips}
            </Layout.ItemsBox>
        </Layout.InputArea>
    )
}

const DrugHistoryController = (props) => {
    return (
        <View>

        </View>
    )
}

let medicalConditions = [
    {
        title: 'Hypertension',
    },
    {
        title: 'Diabetes Mellitus',
    },
    {
        title: 'Hyperlipidemia',
    },
    {
        title: 'Coronary Artery Disease',
    },
    {
        title: 'Stroke',
    },
    {
        title: 'Systemic Embolism',
    },
    {
        title: 'Major Trauma',
    },
    {
        title: 'Permanent Pace Maker',
    },
    {
        title: 'ICD',
    },
    {
        title: 'CRT',
    },
]