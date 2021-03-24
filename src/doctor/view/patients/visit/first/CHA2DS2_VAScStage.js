import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, View} from "react-native";
import {withTheme, Text, Checkbox, RadioButton, Headline, Badge, Colors, useTheme} from 'react-native-paper';
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

class CHA2DS2_VAScStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalScore: 0,
        }
        this.cha2ds2Score = FirstVisit.createNew().cha2ds2Score;
    }

    componentDidMount() {
        const visit = visitDao.getVisits(this.props.route.params.userId);
        if (hasValue(visit.cha2ds2Score))
            this.cha2ds2Score = visit.cha2ds2Score;
        else {
            visit.cha2ds2Score = this.cha2ds2Score;
        }
        this.calcScore();
    }

    calcScore = () => {
        let totalScore = Object.keys(this.cha2ds2Score.data)
            .map(key => this.cha2ds2Score.data[key])
            .reduce((acc, current) => acc + current, 0);

        return totalScore || 0;
    }

    render() {
        const textColor = {color: this.props.theme.colors.text};
        const readonly = this.props.route.params.readonly;
        let titleElement = (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Headline style={textColor}>CHA</Headline>
                    <Text style={{...textColor, fontSize: 14, paddingTop: 15}}>2</Text>
                    <Headline style={textColor}>DS</Headline>
                    <Text style={{...textColor, fontSize: 14, paddingTop: 15}}>2</Text>
                    <Headline style={textColor}>–VASc</Headline>
                    <Headline style={textColor}> Score</Headline>
                </View>
        );
        return (
            <Layout.VisitScreen>
                <TitleWithBadge
                    title={titleElement}
                    badgeValue={this.state.totalScore}
                />
                <Layout.FormSection>
                    <ScoreForm userId={this.props.route.params.userId} onChange={(id, val) => this.calcScore()} readonly={readonly}/>
                </Layout.FormSection>
            </Layout.VisitScreen>
        )
    }
}

export default withTheme(CHA2DS2_VAScStage);

const ScoreForm = (props) => {
    let scoreRadios = scoreItems
        .filter(item => item.yesNo != true)

    let scoreChips = scoreItems
        .filter(item => item.yesNo == true)

    return (
        <View>
            <ScoreRadioBox items={scoreRadios} userId={props.userId} onChange={props.onChange} readonly={props.readonly}/>
            <IntraSectionInvisibleDivider s/>
            <ScoreChipBox items={scoreChips} userId={props.userId} onChange={props.onChange} readonly={props.readonly}/>
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
                    if (visit.current.cha2ds2Score.data.gender == null) {
                        const gender = guessGender(patient);
                        if (gender == 'M') changeGender(0);
                        else if (gender == 'F') changeGender(1);
                    }
                    if (visit.current.cha2ds2Score.data.ageGroup == null) {
                        const age = calcAge(patient.birthDate);
                        if (age < 65) changeAgeGroup(0);
                        else if (65 <= age < 75) changeAgeGroup(1);
                        else if (age >= 75) changeAgeGroup(2);
                    }
                })
    }, []);

    const changeGender = (genderId) => {
        visit.current.cha2ds2Score.data.gender = genderId;
        setGender(genderId);
        if (hasValue(props.onChange)) props.onChange(scoreItems[1].id, genderId);
    }

    const changeAgeGroup = (ageGroupId) => {
        visit.current.cha2ds2Score.data.ageGroup = ageGroupId;
        setAgeGroup(ageGroupId);
        if (hasValue(props.onChange)) props.onChange(scoreItems[0].id, ageGroupId);
    }

    const theme = useTheme();
    return (
        <View>
            <View>
                <Layout.InputTitle title={'Gender'}/>
                <IntraSectionInvisibleDivider xs/>
                <SegmentedControl
                    activeFontStyle={{color: theme.colors.primary}}
                    fontStyle={{color: theme.dark ? null : theme.colors.backdrop}}
                    values={['Male', 'Female']}
                    selectedIndex={gender}
                    onChange={props.readonly ? null : (event) => {
                        changeGender(event.nativeEvent.selectedSegmentIndex)
                    }}
                    backgroundColor={theme.dark ? theme.colors.backdrop : null}
                    tintColor={theme.colors.surface}
                />
            </View>
            <IntraSectionInvisibleDivider sm/>
            <View>
                <Layout.InputTitle title={'Age Group'}/>
                <IntraSectionInvisibleDivider xs/>
                <SegmentedControl
                    activeFontStyle={{color: theme.colors.primary}}
                    fontStyle={{color: theme.dark ? null : theme.colors.backdrop}}
                    values={scoreItems[0].options.map(o => o.name)}
                    selectedIndex={ageGroup}
                    onChange={props.readonly ? null : (event) => {
                        changeAgeGroup(event.nativeEvent.selectedSegmentIndex)
                    }}
                    backgroundColor={theme.dark ? theme.colors.backdrop : null}
                    tintColor={theme.colors.surface}
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
            medicalConditions.current.slice(-1)[0]['value'] = firstNonEmpty(visit.current.cha2ds2Score.data[condition.id], false);
        });
        setLoaded(true);
    }, []);

    const changeValue = (id, value) => {
        visit.current.cha2ds2Score.data[id] = value;
        if (hasValue(props.onChange)) props.onChange(id, value);
    };

    return (
        <Layout.InputArea>
            <IntraSectionInvisibleDivider xs/>
            <Layout.InputTitle title={'Medical History'}/>
            <IntraSectionInvisibleDivider xs/>
            <GenericScoreForm
                medicalConditions={medicalConditions.current}
                onChange={changeValue}
                readonly={props.readonly}
            />
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
        id: 'heartFailureHistory',
        name: 'Congestive Heart Failure',
        yesNo: true,
        noScore: 0,
        yesScore: 1,
    },
    {
        id: 'hypertensionHistory',
        name: 'Hypertension',
        yesNo: true,
        noScore: 0,
        yesScore: 1,
    },
    {
        id: 'strokeHistory',
        name: 'Stroke/TIA/Thromboembolism',
        yesNo: true,
        noScore: 0,
        yesScore: 2,
    },
    {
        id: 'vascular',
        name: 'Vascular Disease',
        yesNo: true,
        noScore: 0,
        yesScore: 1,
    },
    {
        id: 'diabetes',
        name: 'Diabetes',
        yesNo: true,
        noScore: 0,
        yesScore: 1,
    },
]

function getScoreItem(id) {
    return scoreItems.find(item => item.id == id);
}