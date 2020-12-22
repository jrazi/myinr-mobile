import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Switch, Text} from "react-native-paper";
import {ScreenLayout} from "../../../../../root/view/screen/Layout";
import {currentTheme} from "../../../../../../theme";
import * as Layout from "./forms/Layout";
import {SwitchRow} from "./InrInfoStage";
import {IntraSectionDivider, IntraSectionInvisibleDivider} from "./forms/Layout";
import {firstNonEmpty, hasValue} from "../../../../../root/domain/util/Util";
import {visitDao} from "../../../../data/dao/VisitDao";
import {FirstVisit} from "../../../../domain/visit/Visit";
import {TitleWithBadge} from "./forms/ContextSpecificComponents";


export class HAS_BLEDStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            totalScore: 0,
        }
        this.hasBledInfo = FirstVisit.createNew().hasBledScore;
        this.medicalConditions = medicalConditions.map(c => c);
    }

    componentDidMount() {
        this.setState({loaded: false}, () => {
            this.hasBledInfo = visitDao.getVisits(this.props.route.params.userId).hasBledScore;
            this.medicalConditions.forEach(
                condition => condition['value'] = firstNonEmpty(this.hasBledInfo.medicalConditions[condition.id], false)
            )
            this.calcScore();
            this.setState({loaded: true});
        })
    }

    onValueChange = (id, value) => {
        this.hasBledInfo.medicalConditions[id] = value;
        this.calcScore();
    }

    calcScore = () => {
        let totalScore = 0;

        for (const conditionId in this.hasBledInfo.medicalConditions) {
            let scoreItem = getScoreItem(conditionId);
            let hasCondition = this.hasBledInfo.medicalConditions[conditionId];
            if (hasCondition) totalScore += scoreItem.yesScore;
        }
        this.hasBledInfo.totalScore = totalScore;
        this.setState({totalScore: totalScore});
    }

    render() {
        return (
            <Layout.VisitScreen>
                <TitleWithBadge
                    title={'نمره' + ' HAS-BLED'}
                    badgeValue={this.state.totalScore}
                />
                <Layout.FormSection>
                    <GenericScoreForm medicalConditions={this.medicalConditions} onChange={this.onValueChange} key={this.state.loaded}/>
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
        .map((condition, index) => {
            const [value, setValue] = useState(firstNonEmpty(condition.value, false));
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
                        onValueChange={() => {{props.onChange(condition.id, !value); setValue(!value)}}}
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

function getScoreItem(id) {
    return medicalConditions.find(item => item.id == id);
}