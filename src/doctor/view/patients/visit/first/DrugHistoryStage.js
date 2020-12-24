import {View} from "react-native";
import React from "react";
import {Avatar, Button, Text, List, IconButton} from "react-native-paper";
import * as Layout from "./forms/Layout";
import {Colors, currentTheme} from "../../../../../../theme";
import {IntraSectionDivider, IntraSectionInvisibleDivider} from "./forms/Layout";

export class DrugHistoryStage extends React.Component {
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
                <View>
                    <Layout.Row justifyBetween style={{alignItems: 'center',}}>
                        <Layout.ScreenTitle title={'Drug History'} style={{ paddingBottom: 0}}/>
                        <View>
                            <Button color={currentTheme.colors.secondary} compact mode="contained" onPress={() => console.log('Pressed')}>
                                <Text style={{fontSize: 12, color: currentTheme.colors.surface}}>Add Record</Text>
                            </Button>
                        </View>
                    </Layout.Row>
                </View>
                <IntraSectionInvisibleDivider s/>
                <DrugRecords records={tempDrugList}/>
            </Layout.VisitScreen>
        );
    }
}

const DrugRecords = (props) => {
    return (
        <List.Section>
            {
                props.records.map((item, index) => {
                    return (
                        <View key={`DrugRecord${item.id}`}>
                            <SingleDrugRecord
                                name={item.name}
                                since={item.since}
                                until={item.until}
                            />
                            {index == props.records.length-1 ? null : <IntraSectionDivider s/>}
                        </View>
                    )
                })
            }
        </List.Section>
    )
}

const SingleDrugRecord = (props) => {
    return (
        <Layout.Row justifyBetween>
            <View>
                <Layout.InputTitle title={props.name}/>
                <Layout.LayoutCaption>{props.since} - {props.until}</Layout.LayoutCaption>
            </View>
            <View>
                <IconButton
                    icon={"delete-outline"}
                    mode="contained"
                    compact
                    size={26}
                    color={Colors.DEFAULT_RED}
                    onPress={() => console.log('Pressed')}
                />
            </View>
        </Layout.Row>
    )
}

let deleteItem = (list, id) => {
    let deleted = null;
    let index = list.findIndex(item => item.id == id);
    if (index == -1) return null;

    list.splice(index, 1);
}

let tempDrugList = [
    {
        id: 0,
        name: 'Acetaminphone',
        since: '1399-06-07',
        until: '1399-11-22',
    },
    {
        id: 1,
        name: 'Novafen',
        since: '1399-06-07',
        until: '1399-11-22',
    },
    {
        id: 2,
        name: 'Gelofen',
        since: '1399-06-07',
        until: '1399-11-22',
    },
]