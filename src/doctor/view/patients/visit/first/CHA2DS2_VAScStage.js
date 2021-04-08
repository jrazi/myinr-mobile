import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, View} from "react-native";
import {withTheme, Text, Checkbox, RadioButton, Headline, Badge, Colors, useTheme} from 'react-native-paper';
import * as Layout from "./forms/Layout";
import {calcAge, e2p, firstNonEmpty, guessGender, hasValue} from "../../../../../root/domain/util/Util";
import {IntraSectionInvisibleDivider, LayoutStyles} from "./forms/Layout";
import {GenericScoreForm} from "./HAS_BLEDStage";
import {Picker} from "@react-native-community/picker";
import {firstVisitDao} from "../../../../data/dao/FirstVisitDao";
import {doctorDao} from "../../../../data/dao/DoctorDao";
import {TitleWithBadge} from "./forms/ContextSpecificComponents";
import {FirstVisit} from "../../../../domain/visit/FirstVisit";
import SegmentedControl from '@react-native-community/segmented-control';
import color from 'color';
import ListUtil from "../../../../../root/domain/util/ListUtil";

class CHA2DS2_VAScStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalScore: 0,
        }
        this.cha2ds2Score = FirstVisit.createNew().cha2ds2Score;
    }

    componentDidMount() {
        const visit = firstVisitDao.getVisits(this.props.route.params.userId);
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


        this.setState({totalScore: totalScore});

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
                    <ScoreForm userId={this.props.route.params.userId} onChange={(id, score) => this.calcScore()} readonly={readonly}/>
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
    let [gender, setGender] = useState(null);
    let [ageGroupIndex, setAgeGroupIndex] = useState(null);

    let visit = useRef({});

    let [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
        visit.current = firstVisitDao.getVisits(props.userId);
        setGender(firstNonEmpty(visit.current.cha2ds2Score.data.gender, null));
        setAgeGroupIndex(firstNonEmpty(visit.current.cha2ds2Score.data.ageGroup, null));
        setLoaded(true);
    }, []);

    const changeGender = (genderScore) => {
        visit.current.cha2ds2Score.data.gender = genderScore;
        setGender(genderScore);
        if (hasValue(props.onChange)) props.onChange(scoreItems[1].id, genderScore);
    }

    const changeAgeGroup = (ageGroupIndex) => {
        const ageGroupScore = scoreItems[0].options[ageGroupIndex].score;
        visit.current.cha2ds2Score.data.ageGroup = ageGroupScore;
        setAgeGroupIndex(ageGroupIndex);
        if (hasValue(props.onChange)) props.onChange(scoreItems[0].id, ageGroupScore);
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
                    selectedIndex={ageGroupIndex}
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
        visit.current = firstVisitDao.getVisits(props.userId);
        props.items.forEach(condition => {
            medicalConditions.current.push(condition);
            medicalConditions.current.slice(-1)[0]['value'] = firstNonEmpty(visit.current.cha2ds2Score.data[condition.id], false);
        });
        setLoaded(true);
    }, []);

    const changeValue = (id, score) => {
        visit.current.cha2ds2Score.data[id] = score;
        if (hasValue(props.onChange)) props.onChange(id, score);
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