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
import {FollowupVisit} from "../../../domain/visit/FollowupVisit";

export class SecondaryVisitTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newVisitDialogOpen: false,
            loadingVisits: true,
            visits: [],
            appointments: [],
        }
    }

    getAttendableAppointments() {
        return this.state.appointments.filter(appointment => appointment.isScheduled && !appointment.hasVisitHappened)
    }

    componentDidMount() {
        this.loadVisits();
    }

    loadVisits =  () => {
        this.setState({loadingVisits: true}, async () => {
            const visitsPromise = doctorVisitDao.getFollowupVisits(this.props.route.params.userId);
            const appointmentsPromise = doctorVisitDao.getAppointments(this.props.route.params.userId);

            const [visits, appointments] = await Promise.all([visitsPromise, appointmentsPromise]);

            this.setState({
                visits: visits,
                appointments: appointments,
                loadingVisits: false,
            })
        });
    }



    viewVisitInfo = () => {
        this.props.navigation.navigate(
            'FollowupVisitRoot',
            {
                userId: this.props.route.params.userId,
                patientName: '',
                visitInfo: this.state.visits[0],
                readonly: true,
                appointmentId: null,
            },
        );
    }


    attendAnAppointment = (appointment) => {
        if (!appointment || !appointment.isScheduled || appointment.hasVisitHappened) return;
        this.props.navigation.navigate(
            'FollowupVisitRoot',
            {
                userId: this.props.route.params.userId,
                patientName: '',
                readonly: false,
                visitInfo: FollowupVisit.createNew(),
                appointmentId: appointment.id,
            },
        );
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
                                onPress={() => this.attendAnAppointment(this.getAttendableAppointments()[0])}
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