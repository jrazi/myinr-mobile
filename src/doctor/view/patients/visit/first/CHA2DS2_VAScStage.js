import React, {useState} from "react";
import {StyleSheet, View, Picker} from "react-native";
import {currentTheme} from "../../../../../../theme";
import {Text, Checkbox, RadioButton} from 'react-native-paper';
import * as Layout from "./Layout";
import {e2p} from "../../../../../root/domain/util/Util";


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
                <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    <Text style={{fontSize: 20, }}>CHA</Text>
                    <Text style={{fontSize: 11, lineHeight: 40}}>2</Text>
                    <Text style={{fontSize: 20, }}>DS</Text>
                    <Text style={{fontSize: 11, lineHeight: 40}}>2</Text>
                    <Text style={{fontSize: 20, }}>–VASc</Text>
                    <Text style={{fontSize: 20, }}>نمره </Text>
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
                    <Layout.InputTitle title={item.title}/>
                    <Picker
                        selectedValue={value}
                        style={{ height: 50, width: 150 }}
                        mode={'dropdown'}
                        onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
                        key={'ScoreRadioBox' + item.title}

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
        .sort((a, b) => a.title.length - b.title.length)
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
            <Layout.ItemsBox>
                {chips}
            </Layout.ItemsBox>
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
        title: 'گروه سنی',
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
        title: 'جنسیت',
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
        title: 'Congestive Heart Failure',
        yesNo: true,
        noScore: 0,
        yesScore: 1,
    },
    {
        title: 'Hypertension',
        yesNo: true,
        noScore: 0,
        yesScore: 1,
    },
    {
        title: 'Stroke/TIA/Thromboembolism',
        yesNo: true,
        noScore: 0,
        yesScore: 2,
    },
    {
        title: 'Vascular Disease',
        yesNo: true,
        noScore: 0,
        yesScore: 1,
    },
    {
        title: 'Diabetes',
        yesNo: true,
        noScore: 0,
        yesScore: 1,
    },
]