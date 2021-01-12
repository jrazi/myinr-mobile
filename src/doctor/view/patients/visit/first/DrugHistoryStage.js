import {View, FlatList} from "react-native";
import React from "react";
import {Avatar, Button, Text, List, IconButton, Caption, withTheme, useTheme} from "react-native-paper";
import * as Layout from "./forms/Layout";
import {ConditionalRender, IntraSectionDivider, IntraSectionInvisibleDivider} from "./forms/Layout";
import {FirstVisit} from "../../../../domain/visit/Visit";
import {visitDao} from "../../../../data/dao/VisitDao";
import {firstNonEmpty} from "../../../../../root/domain/util/Util";

class DrugHistoryStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            drugHistory: FirstVisit.createNew().drugHistory,
        }

    }

    componentDidMount() {
        this.refreshRecords();
        this.props.navigation.addListener(
            'focus',
            payload => {
                this.refreshRecords();
            }
        );
    }

    refreshRecords = () => {
        this.setState({loaded: false}, () => {
            this.state.drugHistory = visitDao.getVisits(this.props.route.params.userId).drugHistory;
            this.setState({loaded: true});
        })
    }

    deleteRecord = (id) => {
        deleteItem(this.state.drugHistory, id);
        this.setState({drugHistory: this.state.drugHistory});
    }

    render() {
        const theme = this.props.theme;
        const readonly = this.props.route.params.readonly;
        return (
            <Layout.VisitScreen
            >
                <View>
                    <Layout.Row justifyBetween style={{alignItems: 'center',}}>
                        <Layout.ScreenTitle title={'Drug History'} style={{ paddingBottom: 0}}/>
                        <ConditionalRender hidden={readonly}>
                            <View>
                                <Button
                                    color={theme.colors.actionColors.primary}
                                    compact mode="contained"
                                    onPress={() => this.props.navigation.navigate('Secondary:AddDrugRecord')}
                                    labelStyle={{fontSize: 12}}
                                >
                                    Add Record
                                </Button>
                            </View>
                        </ConditionalRender>
                    </Layout.Row>
                </View>
                <IntraSectionInvisibleDivider s/>
                <DrugRecords records={this.state.drugHistory} onDelete={this.deleteRecord} readonly={readonly}/>
            </Layout.VisitScreen>
        );
    }
}

export default withTheme(DrugHistoryStage);
const DrugRecords = (props) => {
    return (
        <List.Section>
            {
                props.records.length == 0 ?
                    (
                        <View style={{paddingTop: 20, alignItems: 'center'}}>
                            <Caption style={{paddingVertical: 10,fontSize: 16}}>
                                No records have been added
                            </Caption>
                        </View>
                    )
                :
                props.records.map((item, index) => {
                    let drugInfo = item.drugInfo;
                    return (
                        <View key={`DrugRecord${drugInfo.IDDrug}`}>
                            <SingleDrugRecord
                                name={drugInfo.DrugName}
                                since={item.since}
                                until={item.until}
                                onDelete={() => props.onDelete(drugInfo.IDDrug)}
                                readonly={props.readonly}
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
    const theme = useTheme();
    return (
        <Layout.Row justifyBetween>
            <View style={{flexGrow: 0, flexShrink: 1}}>
                <Layout.InputTitle title={props.name}/>
                <Layout.LayoutCaption>{firstNonEmpty(props.since, 'NA')} - {firstNonEmpty(props.until, 'NA')}</Layout.LayoutCaption>
            </View>
            <ConditionalRender hidden={props.readonly}>
                <View>
                    <IconButton
                        icon={"delete-outline"}
                        mode="contained"
                        compact
                        size={26}
                        color={theme.colors.actionColors.remove}
                        onPress={props.readonly ? null : () => props.onDelete()}
                    />
                </View>
            </ConditionalRender>
        </Layout.Row>
    )
}

let deleteItem = (list, id) => {
    let index = list.findIndex(item => item.drugInfo.IDDrug == id);
    if (index == -1) return null;

    return list.splice(index, 1);
}
