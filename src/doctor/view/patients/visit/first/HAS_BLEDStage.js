import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Switch, Text, useTheme} from "react-native-paper";
import * as Layout from "./forms/Layout";
import {IntraSectionDivider, IntraSectionInvisibleDivider} from "./forms/Layout";
import {firstNonEmpty, hasValue} from "../../../../../root/domain/util/Util";
import {visitDao} from "../../../../data/dao/VisitDao";
import {FirstVisit} from "../../../../domain/visit/Visit";
import {DefaultSwitch, TitleWithBadge} from "./forms/ContextSpecificComponents";


export class HAS_BLEDStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            totalScore: 0,
        }
        this.hasBledScore = FirstVisit.createNew().hasBledScore;
        this.medicalConditions = medicalConditions.map(c => c);
    }

    componentDidMount() {


        this.setState({loaded: false}, () => {
            const visit = visitDao.getVisits(this.props.route.params.userId);
            if (hasValue(visit.hasBledScore))
                this.hasBledScore = visit.hasBledScore;
            else {
                visit.hasBledScore = this.hasBledScore;
            }
            this.calcScore();

            this.medicalConditions.forEach(
                condition => condition['value'] = firstNonEmpty(this.hasBledScore.data[condition.id] > 0, false)
            )

            this.setState({loaded: true});
        })
    }

    onValueChange = (id, score) => {
        this.hasBledScore.data[id] = score;
        this.calcScore();
    }

    calcScore = () => {

        let totalScore = Object.keys(this.hasBledScore.data)
            .map(key => this.hasBledScore.data[key])
            .reduce((acc, current) => acc + current, 0);

        this.setState({totalScore: totalScore});

        return totalScore || 0;

    }

    render() {
        const readonly = this.props.route.params.readonly;
        return (
            <Layout.VisitScreen>
                <TitleWithBadge
                    title={'HAS-BLED Score'}
                    badgeValue={this.state.totalScore}
                />
                <Layout.FormSection>
                    <GenericScoreForm
                        medicalConditions={this.medicalConditions}
                        onChange={this.onValueChange}
                        key={this.state.loaded}
                        readonly={readonly}
                    />
                </Layout.FormSection>
            </Layout.VisitScreen>
        )
    }
}

export const GenericScoreForm = (props) => {
    let selectedStates = [];
    let conditionElements = props.medicalConditions
        .map((condition, index) => {
            const [value, setValue] = useState(firstNonEmpty(condition.value, false));
            selectedStates.push([value, setValue]);
            const yesScore = condition.yesScore;
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
                    <DefaultSwitch
                        style={{}} value={value}
                        color={useTheme().colors.accent}
                        onValueChange={() => {{props.onChange(condition.id, Number(!value)*yesScore); setValue(!value)}}}
                        disabled={props.readonly}
                    />
                </Layout.Row>,
                index == props.medicalConditions.length - 1 ? null : <IntraSectionDivider key={'hasBledDivider' + condition.id} s/>
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
        id: 'hypertension',
        name: 'Hypertension',
        description: 'Uncontrolled, > 160mmHg Systolic',
        yesScore: 1,
    },
    {
        id: 'renalDisease',
        name: 'Renal disease',
        description: 'Dialysis, transplant, Cr>2.26 mg/dl or >200 µmol/L',
        yesScore: 1,
    },
    {
        id: 'liverDisease',
        name: 'Liver disease',
        description: 'Cirrhosis bilirubin >2x normal, with AST/ALP/AP >3x normal',
        yesScore: 1,
    },
    {
        id: 'strokeHistory',
        name: 'Stroke history',
        description: null,
        yesScore: 1,
    },
    {
        id: 'priorBleeding',
        name: 'Prior bleeding/Predisposition to',
        description: 'Prior major bleeding or predisposition to bleeding',
        yesScore: 1,
    },
    {
        id: 'labileInr',
        name: 'Labile INR',
        description: 'Unstable/high INRs, time in therapeutic range <60%',
        yesScore: 1,
    },
    {
        id: 'ageGroup',
        name: 'Age > 65',
        description: null,
        yesScore: 1,
    },
    {
        id: 'medUsagePredisposingToBleeding',
        name: 'Med usage predisposing to bleeding',
        description: 'Antiplatelet agents, NSAIDs',
        yesScore: 1,
    },
    {
        id: 'alcoholOrDrugUsageHistory',
        name: 'Alcohol or drug usage history',
        description: '≥8 drinks/week',
        yesScore: 1,
    },
]

function getScoreItem(id) {
    return medicalConditions.find(item => item.id == id);
}