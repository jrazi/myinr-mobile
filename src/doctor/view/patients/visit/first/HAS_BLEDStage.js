import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Switch, Text} from "react-native-paper";
import {ScreenLayout} from "../../../../../root/view/screen/Layout";
import {currentTheme} from "../../../../../../theme";
import * as Layout from "./forms/Layout";
import {SwitchRow} from "./InrInfoStage";
import {IntraSectionDivider, IntraSectionInvisibleDivider} from "./forms/Layout";


export class HAS_BLEDStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <Layout.VisitScreen>
                <Layout.ScreenTitle title={'نمره' + ' HAS-BLED'}/>
                <Layout.FormSection>
                    <GenericScoreForm medicalConditions={medicalConditions}/>
                </Layout.FormSection>
            </Layout.VisitScreen>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: currentTheme.colors.surface,
    }
})

export const GenericScoreForm = (props) => {
    let selectedStates = [];
    let conditionElements = props.medicalConditions
        .map(condition => {
            const [value, setValue] = useState(false);
            selectedStates.push([value, setValue]);
            return [
                <Layout.Row
                    justifyBetween
                    style={{flexDirection: 'row-reverse'}}
                    key={'HasBledCondition' + condition.id.toString()}
                >
                    <Layout.SecondaryInputTitle
                        style={{
                            alignItems: 'flex-end',
                            // width: '75%',
                            flexShrink: 1,
                            alignContent: 'flex-end',
                            flexWrap: 'wrap',

                        }}
                        title={condition.name}
                        description={condition.description}
                    />
                    <Switch
                        style={{}} value={value}
                        color={currentTheme.colors.primary}
                        onValueChange={() => {setValue(!value)}}
                    />
                </Layout.Row>,
                <IntraSectionDivider s/>
            ]
        })
    return (
        <View>
            {conditionElements}
        </View>
    )
}

let medicalConditions = [
    {
        id: 0,
        name: 'Hypertension',
        description: 'Uncontrolled, > 160mmHg Systolic',
        yesScore: 1,
    },
    {
        id: 1,
        name: 'Renal disease',
        description: 'Dialysis, transplant, Cr>2.26 mg/dl or >200 µmol/L',
        yesScore: 1,
    },
    {
        id: 2,
        name: 'Liver disease',
        description: 'Cirrhosis bilirubin >2x normal, with AST/ALP/AP >3x normal',
        yesScore: 1,
    },
    {
        id: 3,
        name: 'Stroke history',
        description: null,
        yesScore: 1,
    },
    {
        id: 4,
        name: 'Prior bleeding/Predisposition to',
        description: 'Prior major bleeding or predisposition to bleeding',
        yesScore: 1,
    },
    {
        id: 5,
        name: 'Labile INR',
        description: 'Unstable/high INRs, time in therapeutic range <60%',
        yesScore: 1,
    },
    {
        id: 6,
        name: 'Age > 65',
        description: null,
        yesScore: 1,
    },
    {
        id: 7,
        name: 'Med usage predisposing to bleeding',
        description: 'Antiplatelet agents, NSAIDs',
        yesScore: 1,
    },
    {
        id: 8,
        name: 'Alcohol or drug usage history',
        description: '≥8 drinks/week',
        yesScore: 1,
    },
]