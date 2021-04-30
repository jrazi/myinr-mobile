import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {FAB, List} from "react-native-paper";
import {FollowupVisitNotImplementedDialog} from "../VisitRedirect";
import {ScreenLayout} from "../../../../root/view/screen/Layout";
import {PatientProfileContext} from "./ContextProvider";
import {ItemListContainer} from "../../../../root/view/list/ItemList";
import {doctorVisitDao} from "../../../data/dao/DoctorVisitDao";
import {FollowupVisit} from "../../../domain/visit/FollowupVisit";
import {AttendedVisitInfoCard} from "./cards/VisitCard";
import {AppointmentCard} from "./cards/AppointmentCard";
import {ConditionalCollapsibleRender} from "../visit/first/forms/Layout";
import {EmptyList} from "../../../../root/view/list/EmptyListMessage";
import {hasValue} from "../../../../root/domain/util/Util";

export class SecondaryVisitTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newVisitDialogOpen: false,
            loadingVisits: true,
            visits: [],
            appointments: [],
            attendableAppointments: [],
        }
    }

    static contextType = PatientProfileContext;

    componentDidMount() {
        this.setState({
            visits: this.context.patient.visits || []
        }, () => {
            // this.loadVisits();
        })
    }

    loadVisits =  () => {
        this.setState({loadingVisits: true}, async () => {
            const visitsPromise = doctorVisitDao.getFollowupVisits(this.props.route.params.userId);
            const appointmentsPromise = doctorVisitDao.getAppointments(this.props.route.params.userId);

            const [visits, appointments] = await Promise.all([visitsPromise, appointmentsPromise]);
            const sortedVisits = (visits || []).sort((a, b) => Number(b.visitDate.timestamp || 0) - Number(a.visitDate.timestamp || 0));

            const sortedAttendableAppointments = appointments
                .filter(appointment => appointment.isScheduled && !appointment.hasVisitHappened)
                .sort((a, b) => Number(a.scheduledVisitDate.timestamp) - Number(b.scheduledVisitDate.timestamp))

            this.setState({
                visits: sortedVisits,
                appointments: appointments,
                attendableAppointments: sortedAttendableAppointments,
                loadingVisits: false,
            })
        });
    }



    viewVisitInfo = (index) => {
        this.props.navigation.navigate(
            'FollowupVisitRoot',
            {
                userId: this.props.route.params.userId,
                patientName: '',
                visitInfo: this.state.visits[index],
                readonly: true,
                appointmentId: null,
            },
        );
    }


    attendAnAppointment = (index) => {
        const appointment = this.state.attendableAppointments[index];
        if (!appointment || !appointment.isScheduled || appointment.hasVisitHappened) return;
        this.props.navigation.navigate(
            'FollowupVisitRoot',
            {
                userId: this.props.route.params.userId,
                patientName: '',
                readonly: false,
                visitInfo: FollowupVisit.createNew(this.context.patient.medicationHistory),
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
                                appointments={this.state.attendableAppointments}
                                refreshing={this.state.loadingVisits}
                                onRefresh={this.loadVisits}
                                viewVisitInfo={this.viewVisitInfo}
                                attendAnAppointment={this.attendAnAppointment}
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


const VisitList = (props) => {
    const appointmentItems = props.appointments.map((appointment, index) => {
        return (
            <AppointmentCard
                key={`AppointmentCard_${appointment.id}`}
                appointment={appointment}
                index={index}
                attendAnAppointment={props.attendAnAppointment}
            />
        )
    })

    const indexOffset = appointmentItems.length;
    const visitItems = props.visits.map((visit, index) => {
        return (
            <AttendedVisitCard
                key={`AttendedVisitCard_${visit.id}`}
                visitInfo={visit}
                index={index}
                viewVisitInfo={props.viewVisitInfo}
            />
        )
    });

    const ListSection = ({listItems, refreshing, subheaderTitle, emptyListMessage}) => {
        return (
            <List.Section>
                <ConditionalCollapsibleRender key={`LIST_HEADER`} hidden={refreshing}>
                    <List.Subheader style={{}}>{subheaderTitle}</List.Subheader>
                    <EmptyList
                        hidden={refreshing || (listItems.length > 0)}
                        message={emptyListMessage}
                    />
                </ConditionalCollapsibleRender>
                {listItems}
            </List.Section>
        )
    }
    return (
        <ItemListContainer
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
            emptyListMessageEnabled={false}
        >
            {
                [
                    <ListSection key={`AppointmentsSection`}
                                 listItems={appointmentItems}
                                 refreshing={props.refreshing}
                                 subheaderTitle={'ویزیت‌های آتی'}
                                 emptyListMessage={'ویزیتی برای آینده مقرر نشده'}
                    />,
                    <ListSection key={`VisitsSection`}
                                 listItems={visitItems}
                                 refreshing={props.refreshing}
                                 subheaderTitle={'ویزیت‌های پیشین'}
                                 emptyListMessage={'بیمار تاکنون ویزیت نشده‌است'}
                    />,
                ]
            }
        </ItemListContainer>
    )
}


const AttendedVisitCard = (props) => {
    return (
        <VisitCardWrapper>
            <AttendedVisitInfoCard {...props}/>
        </VisitCardWrapper>
    )
}
const VisitCardWrapper = (props) => {
    return (
        <View>
            {props.children}
        </View>
    )
}



const styles = StyleSheet.create({
});

