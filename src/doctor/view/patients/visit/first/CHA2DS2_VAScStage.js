import React, {useState} from "react";
import {StyleSheet, View, Picker} from "react-native";
import {currentTheme} from "../../../../../../theme";
import {Text, Checkbox, RadioButton, Headline} from 'react-native-paper';
import * as Layout from "./forms/Layout";
import {e2p} from "../../../../../root/domain/util/Util";
import {IntraSectionInvisibleDivider} from "./forms/Layout";
import {GenericScoreForm} from "./HAS_BLEDStage";


export class CHA2DS2_VAScStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        let titleElement = (
                <View style={{flexDirection: 'row', alignItems: 'flex-start', }}>
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
                <Layout.ScreenTitle title={titleElement}/>
                <Layout.FormSection>
                    <ScoreForm/>
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
            <ScoreRadioBox items={scoreRadios}/>
            <IntraSectionInvisibleDivider s/>
            <ScoreChipBox items={scoreChips}/>
        </View>
    )
}

const ScoreRadioBox = (props) => {
    let selectedStates = [];
    let radiosRows = props.items
        .map(item => {
            const [value, setValue] = useState(item.options[0].id);
            selectedStates.push([value, setValue]);
            return (
                <Layout.Row justifyBetween>
                    <Layout.InputTitle title={item.name}/>
                    <Picker
                        selectedValue={value}
                        style={{ height: 50, width: 150 }}
                        mode={'dropdown'}
                        onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
                        key={'ScoreRadioBox' + item.name}

                    >
                        {
                            item.options.map(option => <Picker.Item label={option.name} value={option.id} />)
                        }
                    </Picker>
                </Layout.Row>
            )
        })
    return (
        <View>
            {radiosRows}
        </View>
    )
}

const ScoreChipBox = (props) => {
    let selectedStates = [];
    let chips = props.items
        .sort((a, b) => a.name.length - b.name.length)
        .map(item => {
            const [value, setValue] = useState(false);
            selectedStates.push([value, setValue]);
            return (
                <Layout.DefaultChip
                    selected={value} title={item.title} onPress={() => setValue(!value)} key={item.title}
                />
            )
        })

    return (
        <Layout.InputArea>
            <Layout.InputTitle title={'سوابق پزشکی'}/>
            <IntraSectionInvisibleDivider s/>
            <GenericScoreForm medicalConditions={props.items}/>
            {/*<IntraSectionInvisibleDivider xs/>*/}
            {/*<Layout.ItemsBox>*/}
            {/*    {chips}*/}
            {/*</Layout.ItemsBox>*/}
        </Layout.InputArea>
    )
}

const ScoreRadioItem = (props) => {
    return (
        null
    )
}

let scoreItems = [
    {
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
                name: e2p('۷۵و بیشتر'),
                score: 2,
            },
        ],
    },
    {
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