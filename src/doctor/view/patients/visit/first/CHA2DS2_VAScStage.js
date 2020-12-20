import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, View} from "react-native";
import {currentTheme} from "../../../../../../theme";
import {Text, Checkbox, RadioButton, Headline, Badge} from 'react-native-paper';
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
                    <Headline style={{}}>نمره </Headline>
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
                        if (gender == 'M') visit.current.cha2ds2Score.sex = 0;
                        else if (gender == 'F') visit.current.cha2ds2Score.sex = 1;
                        setGender(visit.current.cha2ds2Score.sex);
                    }
                    if (visit.current.cha2ds2Score.ageGroup == null) {
                        const age = calcAge(patient.birthDate);
                        if (age < 65) visit.current.cha2ds2Score.ageGroup = 0;
                        else if (65 <= age < 75) visit.current.cha2ds2Score.ageGroup = 1;
                        else if (age >= 75) visit.current.cha2ds2Score.ageGroup = 2;
                        setAgeGroup(visit.current.cha2ds2Score.ageGroup);
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
            <Layout.Row justifyBetween>
                <Layout.InputTitle title={'گروه سنی'}/>
                <Picker
                    selectedValue={ageGroup}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => changeAgeGroup(itemValue)}
                    key={'ScoreRadioBoxAgeGroup'}

                >
                    <Picker.Item label={scoreItems[0].options[0].name} value={0} />
                    <Picker.Item label={scoreItems[0].options[1].name} value={1} />
                    <Picker.Item label={scoreItems[0].options[2].name} value={2} />
                </Picker>
            </Layout.Row>
            <Layout.Row justifyBetween>
                <Layout.InputTitle title={'جنسیت'}/>
                <Picker
                    selectedValue={gender}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => changeGender(itemValue)}
                    key={'ScoreRadioBoxGender'}

                >
                    <Picker.Item label={'مرد'} value={0} />
                    <Picker.Item label={'زن'} value={1} />
                </Picker>
            </Layout.Row>
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
            <Layout.InputTitle title={'سوابق پزشکی'}/>
            <IntraSectionInvisibleDivider s/>
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
                name: e2p('کم‌تر از ۶۵'),
                score: 0,
            },
            {
                id: 1,
                name: e2p('۶۵ تا ۷۴'),
                score: 1,
            },
            {
                id: 2,
                name: e2p('۷۵ و بیشتر'),
                score: 2,
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