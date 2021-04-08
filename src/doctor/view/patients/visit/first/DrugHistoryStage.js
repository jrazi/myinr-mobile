import {View, FlatList} from "react-native";
import React from "react";
import {Avatar, Button, Text, List, IconButton, Caption, withTheme, useTheme} from "react-native-paper";
import * as Layout from "./forms/Layout";
import {ConditionalRender, IntraSectionDivider, IntraSectionInvisibleDivider} from "./forms/Layout";
import {FirstVisit} from "../../../../domain/visit/FirstVisit";
import {firstVisitDao} from "../../../../data/dao/FirstVisitDao";
import {firstNonEmpty} from "../../../../../root/domain/util/Util";
import ListUtil from "../../../../../root/domain/util/ListUtil";

class DrugHistoryStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            medicationHistory: FirstVisit.createNew().medicationHistory,
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
            this.state.medicationHistory = firstVisitDao.getVisits(this.props.route.params.userId).medicationHistory;
            this.setState({loaded: true});
        })
    }

    deleteRecord = (id) => {
        ListUtil.removeById(this.state.medicationHistory, id);
        this.setState({medicationHistory: this.state.medicationHistory});
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
                <DrugRecords records={this.state.medicationHistory} onDelete={this.deleteRecord} readonly={readonly}/>
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
                    return (
                        <View key={`DrugRecord${item.id}`}>
                            <SingleDrugRecord
                                name={item.drugName || "N/A"}
                                since={item.startDate || "N/A"}
                                until={item.endDate || "N/A"}
                                onDelete={() => props.onDelete(item.id)}
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
