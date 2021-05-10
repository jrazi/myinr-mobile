import React from "react";
import {ScreenLayout, TitleOnlyScreenHeader} from "../../root/view/screen/Layout";
import {ItemListContainer} from "../../root/view/list/ItemList";
import {Avatar, Button, Card, Surface, useTheme} from "react-native-paper";
import {
    ConditionalCollapsibleRender,
    IntraSectionInvisibleDivider
} from "../../doctor/view/patients/visit/first/forms/Layout";
import {patientDao} from "../data/dao/PatientDao";
import {StyleSheet, View} from "react-native";
import {AppointmentInfoRows} from "../../doctor/view/common/cards/Appointment";
import {rootDao} from "../../root/data/dao/RootDao";
import {AppointmentListFilter} from "./filter/AppointmentListFilter";
import {AppointmentFilterType, appointmentListStore} from "./store/AppointmentListStore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default class AppointmentsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loadingAppointments: true,
            appointmentsToDisplay: [],
            appointmentFilterType: AppointmentFilterType.ALL,
        }
        this.appointmentStore = appointmentListStore;
        this.user = null;
    }

    componentDidMount() {
        rootDao.getUser().then(user => {
            this.user = user;
            this.loadAppointments();
        });
    }

    loadAppointments =  () => {
        this.setState({loadingAppointments: true}, async () => {
            const attendableAppointments = await patientDao.getAppointments();

            this.appointmentStore.changeAppointments(attendableAppointments);
            const appointmentsToDisplay = this.appointmentStore.filterByType(this.state.appointmentFilterType);

            this.setState({
                appointmentsToDisplay: appointmentsToDisplay,
                loadingAppointments: false,
            })
        });
    }

    filterAppointments = (type) => {
        this.setState({loadingAppointments: true, appointmentFilterType: type}, async () => {
            setTimeout(() => {
                const appointmentsToDisplay = this.appointmentStore.filterByType(this.state.appointmentFilterType);

                this.setState({
                    appointmentsToDisplay: appointmentsToDisplay,
                    loadingAppointments: false,
                })

            }, 700)
        });
    }

    render() {
        return (
            <ScreenLayout>
                <ControlHeader
                    filterFutureAppointments={() => this.filterAppointments(AppointmentFilterType.FUTURE)}
                    filterAttendedAppointments={() => this.filterAppointments(AppointmentFilterType.DONE)}
                    filterAllAppointments={() => this.filterAppointments(AppointmentFilterType.ALL)}
                />
                <AppointmentList
                    appointments={this.state.appointmentsToDisplay}
                    refreshing={this.state.loadingAppointments}
                    onRefresh={this.loadAppointments}
                    physicianInfo={(this.user || {}).physician}
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
                physicianInfo={props.physicianInfo}
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
                title="تاریخچه ویزیت‌ها"
                style={{elevation: 0}}
            />
            <ConditionalCollapsibleRender hidden={false}>
                <AppointmentListFilter
                    filterFutureAppointments={props.filterFutureAppointments}
                    filterAttendedAppointments={props.filterAttendedAppointments}
                    filterAllAppointments={props.filterAllAppointments}
                />
            </ConditionalCollapsibleRender>
        </Surface>
    )
}

const AppointmentCard = (props) => {
    const theme = useTheme();

    const CardContainer = ({index, style, ...props}) => {
        if (index % 2 == 0) {
            return <View style={[{}, style]}>
                {props.children}
            </View>
        } else return <Surface style={[{elevation: 0,}, style]}>
            {props.children}
        </Surface>
    }

    const FutureVisitIcon = (_props) => (
        <MaterialCommunityIcons name="calendar-clock" size={24} color={theme.colors.actionColors.primary}/>
    );

    const AttendedVisitIcon = (_props) => (
        <MaterialCommunityIcons name="calendar-check" size={24} color={theme.colors.actionColors.confirm}/>
    );

    const ExpiredVisitIcon = (_props) => (
        <MaterialCommunityIcons name="calendar-remove" size={24} color={theme.colors.actionColors.remove}/>
    );

    const visitIcon = props.appointment.hasVisitHappened ? <AttendedVisitIcon/> : props.appointment.expired ? <ExpiredVisitIcon/> : <FutureVisitIcon/>;

    return (
        <CardContainer index={props.index}
                       style={[{
                           // elevation: 4,
                       }, styles.appointmentCardContainer]}
        >
            <View style={{
                // paddingBottom: 10,
                paddingVertical: 10,
            }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Card.Title
                        title={'دکتر' + ' ' + props.physicianInfo.fullName}
                        subtitle={''}
                        style={{
                            flexGrow: 0,
                            width: '60%',
                        }}
                    />

                    <View
                        style={{
                            paddingHorizontal: 25,
                        }}
                    >
                        {visitIcon}
                    </View>

                </View>

                <Card.Content>
                    <View>
                        <AppointmentInfoRows appointment={props.appointment}/>
                    </View>
                </Card.Content>
                <IntraSectionInvisibleDivider none borderWidth={0.1} style={{marginHorizontal: 20, marginTop: 10,}}/>
            </View>
        </CardContainer>
    );
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
    },

    appointmentCardContainer: {},
    appointmentCard: {},
});


