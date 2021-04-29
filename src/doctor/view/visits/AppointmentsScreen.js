import React, {useState} from "react";
import {
    ScreenLayout, TitleOnlyScreenHeader
} from "../../../root/view/screen/Layout";
import {List, Searchbar, Surface, useTheme} from "react-native-paper";
import {ConditionalCollapsibleRender, ConditionalRender} from "../patients/visit/first/forms/Layout";
import {ItemListContainer} from "../../../root/view/list/ItemList";
import {doctorDao} from "../../data/dao/DoctorDao";
import {FollowupVisit} from "../../domain/visit/FollowupVisit";
import {AppointmentListFilter} from "./filter/AppointmentListFilter";
import {AppointmentFilterType, appointmentListStore} from "./filter/AppointmentListStore";
import {AppointmentCard} from "./cards/AppointmentCard";

export default class AppointmentsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loadingAppointments: false,
            appointmentsToDisplay: [],
            appointmentFilterType: AppointmentFilterType.ALL,
        }
        this.appointmentStore = appointmentListStore;
    }

    componentDidMount() {
        this.loadAppointments();
    }

    loadAppointments =  () => {
        this.setState({loadingAppointments: true}, async () => {
            const attendableAppointments = await doctorDao.getAllAttendableAppointments();

            const sortedAttendableAppointments = attendableAppointments
                .sort((a, b) => Number(a.scheduledVisitDate.timestamp) - Number(b.scheduledVisitDate.timestamp))

            this.appointmentStore.changeAppointments(sortedAttendableAppointments);
            const appointmentsToDisplay = this.appointmentStore.filterByType(this.state.appointmentFilterType);

            this.setState({
                appointmentsToDisplay: appointmentsToDisplay,
                loadingAppointments: false,
            })
        });
    }

    attendAnAppointment = (index) => {
        const appointment = this.state.appointmentsToDisplay[index];
        if (!appointment || !appointment.isScheduled || appointment.hasVisitHappened) return;
        this.props.navigation.navigate(
            'FollowupVisitRoot',
            {
                userId: appointment.patientUserId,
                patientName: appointment.patient.fullName,
                readonly: false,
                visitInfo: FollowupVisit.createNew(appointment.patient.medicationHistory),
                appointmentId: appointment.id,
            },
        );
    }

    filterAppointments = (type) => {
        this.setState({loadingAppointments: true, appointmentFilterType: type}, async () => {
            setTimeout(() => {
                const appointmentsToDisplay = this.appointmentStore.filterByType(this.state.appointmentFilterType);

                this.setState({
                    appointmentsToDisplay: appointmentsToDisplay,
                    loadingAppointments: false,
                })

            }, 1000)
        });
    }

    render() {
        return (
            <ScreenLayout>
                <ControlHeader
                    filterTodayAppointments={() => this.filterAppointments(AppointmentFilterType.TODAY)}
                    filterThisWeekAppointments={() => this.filterAppointments(AppointmentFilterType.WEEK)}
                    filterThisMonthAppointments={() => this.filterAppointments(AppointmentFilterType.MONTH)}
                    filterAllAppointments={() => this.filterAppointments(AppointmentFilterType.ALL)}
                />
                <AppointmentList
                    appointments={this.state.appointmentsToDisplay}
                    refreshing={this.state.loadingAppointments}
                    onRefresh={this.loadAppointments}
                    attendAnAppointment={this.attendAnAppointment}
                />
            </ScreenLayout>
        );
    }
}

const AppointmentList = (props) => {
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

    return (
        <ItemListContainer
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
        >
            {
                appointmentItems
            }
        </ItemListContainer>
    )
}

const ControlHeader = (props) => {
    const theme = useTheme();

    return (
        <Surface style={{elevation: 4}}>
            <TitleOnlyScreenHeader
                title="برنامه ویزیت‌ها"
                style={{elevation: 0}}
            />
            <ConditionalCollapsibleRender hidden={false}>
                <AppointmentListFilter
                    filterTodayAppointments={props.filterTodayAppointments}
                    filterThisWeekAppointments={props.filterThisWeekAppointments}
                    filterThisMonthAppointments={props.filterThisMonthAppointments}
                    filterAllAppointments={props.filterAllAppointments}
                />
            </ConditionalCollapsibleRender>
        </Surface>
    )
}



