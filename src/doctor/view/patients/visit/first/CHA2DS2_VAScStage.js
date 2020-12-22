import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, View} from "react-native";
import {currentTheme} from "../../../../../../theme";
import {Text, Checkbox, RadioButton, Headline, Badge, Colors} from 'react-native-paper';
import * as Layout from "./forms/Layout";
import {calcAge, e2p, firstNonEmpty, guessGender, hasValue} from "../../../../../root/domain/util/Util";
import {IntraSectionInvisibleDivider, LayoutStyles} from "./forms/Layout";
import {GenericScoreForm} from "./HAS_BLEDStage";
import {Picker} from "@react-native-community/picker";
import {visitDao} from "../../../../data/dao/VisitDao";
import {doctorDao} from "../../../../data/dao/DoctorDao";
import {TitleWithBadge} from "./forms/ContextSpecificComponents";
import {FirstVisit} from "../../../../domain/visit/Visit";
import SegmentedControl from '@react-native-community/segmented-control';
import color from 'color';

export class CHA2DS2_VAScStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalScore: 0,
        }
        this.cha2ds2Score = FirstVisit.createNew().cha2ds2Score;
    }

    componentDidMount() {
        this.cha2ds2Score = visitDao.getVisits(this.props.route.params.userId).cha2ds2Score;
        this.calcScore();
    }

    calcScore = () => {
        let totalScore = 0;
        if (hasValue(this.cha2ds2Score.ageGroup)) {
            totalScore += scoreItems[0].options[this.cha2ds2Score.ageGroup].score;
        }
        if (hasValue(this.cha2ds2Score.sex)) {
            totalScore += scoreItems[1].options[this.cha2ds2Score.sex].score;
        }
        for (const conditionId in this.cha2ds2Score.medicalHistory) {
            let scoreItem = getScoreItem(conditionId);
            let hasCondition = this.cha2ds2Score.medicalHistory[conditionId];
            if (hasCondition) totalScore += scoreItem.yesScore;
            else totalScore += scoreItem.noScore;
        }
        this.cha2ds2Score.totalScore = totalScore;
        this.setState({totalScore: totalScore});
    }

    render() {
        let titleElement = (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Headline style={{}}>CHA</Headline>
                    <Text style={{fontSize: 14, paddingTop: 15}}>2</Text>
                    <Headline style={{}}>DS</Headline>
                    <Text style={{fontSize: 14, paddingTop: 15}}>2</Text>
                    <Headline style={{ }}>–VASc</Headline>
                    <Headline style={{}}> Score</Headline>
                </View>
        );
        return (
            <Layout.VisitScreen>
                <TitleWithBadge
                    title={titleElement}
                    badgeValue={this.state.totalScore}
                />
                <Layout.FormSection>
                    <ScoreForm userId={this.props.route.params.userId} onChange={(id, val) => this.calcScore()}/>
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

const ScoreForm = (props) => {
    let scoreRadios = scoreItems
        .filter(item => item.yesNo != true)

    let scoreChips = scoreItems
        .filter(item => item.yesNo == true)

    return (
        <View>
            <ScoreRadioBox items={scoreRadios} userId={props.userId} onChange={props.onChange}/>
            <IntraSectionInvisibleDivider s/>
            <ScoreChipBox items={scoreChips} userId={props.userId} onChange={props.onChange}/>
        </View>
    )
}

const ScoreRadioBox = (props) => {
    let [gender, setGender] = useState(0);
    let [ageGroup, setAgeGroup] = useState(0);

    let visit = useRef({});

    let [loaded, setLoaded] = useState(false);
    let [ageItems, genderItems] = scoreItems;
    useEffect(() => {
        setLoaded(false);
        visit.current = visitDao.getVisits(props.userId);
        setLoaded(true);
            doctorDao.getPatientInfo(props.userId)
                .then(patient => {
                    if (visit.current.cha2ds2Score.sex == null) {
                        const gender = guessGender(patient);
                        if (gender == 'M') changeGender(0);
                        else if (gender == 'F') changeGender(1);
                    }
                    if (visit.current.cha2ds2Score.ageGroup == null) {
                        const age = calcAge(patient.birthDate);
                        if (age < 65) changeAgeGroup(0);
                        else if (65 <= age < 75) changeAgeGroup(1);
                        else if (age >= 75) changeAgeGroup(2);
                    }
                })
    }, []);

    const changeGender = (genderId) => {
        visit.current.cha2ds2Score.sex = genderId;
        setGender(genderId);
        if (hasValue(props.onChange)) props.onChange(scoreItems[1].id, genderId);
    }

    const changeAgeGroup = (ageGroupId) => {
        visit.current.cha2ds2Score.ageGroup = ageGroupId;
        setAgeGroup(ageGroupId);
        if (hasValue(props.onChange)) props.onChange(scoreItems[0].id, ageGroupId);
    }

    return (
        <View>
            <View>
                <Layout.InputTitle title={'Gender'}/>
                <IntraSectionInvisibleDivider xs/>
                <SegmentedControl
                    activeFontStyle={{color: currentTheme.colors.primary}}
                    values={['Male', 'Female']}
                    selectedIndex={gender}
                    onChange={(event) => {
                        changeGender(event.nativeEvent.selectedSegmentIndex)
                    }}
                />
            </View>
            <IntraSectionInvisibleDivider sm/>
            <View>
                <Layout.InputTitle title={'Age Group'}/>
                <IntraSectionInvisibleDivider xs/>
                <SegmentedControl
                    activeFontStyle={{color: currentTheme.colors.primary}}
                    values={scoreItems[0].options.map(o => o.name)}
                    selectedIndex={ageGroup}
                    onChange={(event) => {
                        changeAgeGroup(event.nativeEvent.selectedSegmentIndex)
                    }}
                />
            </View>
        </View>
    )
}

const ScoreChipBox = (props) => {
    let visit = useRef({});

    let [loaded, setLoaded] = useState(false);
    let medicalConditions = useRef([]);
    useEffect(() => {
        setLoaded(false);
        visit.current = visitDao.getVisits(props.userId);
        props.items.forEach(condition => {
            medicalConditions.current.push(condition);
            medicalConditions.current.slice(-1)[0]['value'] = firstNonEmpty(visit.current.cha2ds2Score.medicalHistory[condition.id], false);
        });
        setLoaded(true);
    }, []);

    const changeValue = (id, value) => {
        visit.current.cha2ds2Score.medicalHistory[id] = value;
        if (hasValue(props.onChange)) props.onChange(id, value);
    };

    return (
        <Layout.InputArea>
            <IntraSectionInvisibleDivider xs/>
            <Layout.InputTitle title={'Medical History'}/>
            <IntraSectionInvisibleDivider xs/>
            <GenericScoreForm medicalConditions={medicalConditions.current} onChange={changeValue}/>
        </Layout.InputArea>
    )
}

let scoreItems = [
    {
        id: 'ageGroup',
        name: 'گروه سنی',
        options: [
            {
                id: 0,
                name: '> 75',
                score: 2,
            },
            {
                id: 1,
                name: '65-74',
                score: 1,
            },
            {
                id: 2,
                name: '< 65',
                score: 0,
            },
        ],
    },
    {
        id: 'gender',
        name: 'جنسیت',
        options: [
            {
                id: 0,
                name: 'مرد',
                score: 0,
            },
            {
                id: 1,
                name: 'زن',
                score: 1,
            },
        ],
    },
    {
        id: 0,
        name: 'Congestive Heart Failure',
        yesNo: true,
        noScore: 0,
        yesScore: 1,
    },
    {
        id: 1,
        name: 'Hypertension',
        yesNo: true,
        noScore: 0,
        yesScore: 1,
    },
    {
        id: 2,
        name: 'Stroke/TIA/Thromboembolism',
        yesNo: true,
        noScore: 0,
        yesScore: 2,
    },
    {
        id: 3,
        name: 'Vascular Disease',
        yesNo: true,
        noScore: 0,
        yesScore: 1,
    },
    {
        id: 4,
        name: 'Diabetes',
        yesNo: true,
        noScore: 0,
        yesScore: 1,
    },
]

function getScoreItem(id) {
    return scoreItems.find(item => item.id == id);
}