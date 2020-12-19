
import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {currentTheme} from "../../../../../../theme";
import * as Layout from "./forms/Layout";
import {DefaultChip, IntraSectionDivider, IntraSectionInvisibleDivider, ItemsBox} from "./forms/Layout";
import {visitDao} from "../../../../data/dao/VisitDao";
import {firstNonEmpty} from "../../../../../root/domain/util/Util";
import {ChipBox} from "./forms/ContextSpecificComponents";


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
                    <MedicalHistoryChipBox userId={this.props.route.params.userId}/>
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

    medicalConditions.sort((a, b) => a.name.length - b.name.length);

    let visit = useRef({});

    let [loaded, setLoaded] = useState(false);
    useEffect(() => {
        visit.current = visitDao.getVisits(props.userId);
        medicalConditions
            .sort((a, b) => a.name.length - b.name.length)
            .forEach(condition => {
                condition['value'] = firstNonEmpty(visit.current.medicalHistory[condition.id], false);
            });
        setLoaded(true);
    }, []);



    const changeValue = (id, value) => {visit.current.medicalHistory[id] = value};
    
    return (
        <Layout.InputArea>
            <Layout.ItemsBox>
                <ChipBox items={medicalConditions} onChange={changeValue}/>
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
        id: 0,
        name: 'Hypertension',
    },
    {
        id: 1,
        name: 'Diabetes Mellitus',
    },
    {
        id: 2,
        name: 'Hyperlipidemia',
    },
    {
        id: 3,
        name: 'Coronary Artery Disease',
    },
    {
        id: 4,
        name: 'Stroke',
    },
    {
        id: 5,
        name: 'Systemic Embolism',
    },
    {
        id: 6,
        name: 'Major Trauma',
    },
    {
        id: 7,
        name: 'Permanent Pace Maker',
    },
    {
        id: 8,
        name: 'ICD',
    },
    {
        id: 9,
        name: 'CRT',
    },
]