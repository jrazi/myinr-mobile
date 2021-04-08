import React from "react";
import {View, ScrollView} from "react-native";
import {FAB, Text, Subheading} from "react-native-paper";
import {FollowupVisitNotImplementedDialog} from "../VisitRedirect";
import {ScreenLayout} from "../../../../root/view/screen/Layout";
import {StyleSheet} from "react-native";
import {EmptyList} from "../../../../root/view/list/EmptyListMessage";
import {PatientProfileContext} from "./ContextProvider";
import {ItemListContainer} from "../../../../root/view/list/ItemList";
import {doctorVisitDao} from "../../../data/dao/DoctorVisitDao";

export class SecondaryVisitTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newVisitDialogOpen: false,
            loadingVisits: true,
            visits: [],
        }
    }

    componentDidMount() {
        this.loadVisits();
    }

    loadVisits =  () => {
        this.setState({loadingVisits: true}, async () => {
            const visits = await doctorVisitDao.getFollowupVisits(this.props.route.params.userId);

            this.setState({
                visits: visits,
                loadingVisits: false,
            })
        });
    }

    startVisitSession = (useCache) => {
        this.setState({newVisitDialogOpen: false}, () => {
            this.props.navigation.navigate(
                'VisitSessionScreen',
                {userId: this.props.route.params.userId, patientName: '', useCache: useCache}
            );
        })
    }

    render() {
        return (
            <PatientProfileContext.Consumer>
                {(value) => {
                    return (
                        <ScreenLayout>
                            <VisitList
                                visits={this.state.visits}
                                refreshing={this.state.loadingVisits}
                                onRefresh={this.loadVisits}
                            />
                            <FAB
                                style={styles.fab}
                                icon={'note-plus'}
                                onPress={() => this.setState({newVisitDialogOpen: true})}
                            />
                            <StartSecondaryVisitDialog
                                visible={this.state.newVisitDialogOpen}
                                onDismiss={() => this.setState({newVisitDialogOpen: false})}
                            />
                        </ScreenLayout>
                )}}
            </PatientProfileContext.Consumer>
        )
    }
}

const StartSecondaryVisitDialog = (props) => {
    return <FollowupVisitNotImplementedDialog
        visible={props.visible}
        onDismiss={props.onDismiss}
    />;
}
const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 24,
        left: 0,
        bottom: 0,
    },
})


const VisitList = (props) => {
    return (
        <ItemListContainer
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
        >
            {
                props.visits.map(visit => {
                    return (
                        <View>
                            <Text>
                                {'Id: ' + visit.id}
                            </Text>
                        </View>
                    )
                })
            }
        </ItemListContainer>
    )
}