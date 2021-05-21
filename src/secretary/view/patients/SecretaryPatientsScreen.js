import React from "react";
import {rootDao} from "../../../root/data/dao/RootDao";
import {patientDao} from "../../../patient/data/dao/PatientDao";
import {ScreenLayout, TitleOnlyScreenHeader} from "../../../root/view/screen/Layout";
import {ItemListContainer} from "../../../root/view/list/ItemList";
import {Card, Surface, useTheme} from "react-native-paper";
import {
    ConditionalCollapsibleRender,
    IntraSectionInvisibleDivider
} from "../../../doctor/view/patients/visit/first/forms/Layout";
import {StyleSheet, View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {secretaryPatientsDao} from "../../data/SecretaryPatientsDao";
import {PatientInfoCard} from "./PatientCard";
import {noop} from "../../../root/domain/util/Util";


export default class SecretaryPatientsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loadingPatients: true,
            patientsToDisplay: [],
            patientFilterType: null,
        }
        this.patientStore = null;
        this.user = null;
    }

    componentDidMount() {
        rootDao.getUser().then(user => {
            this.user = user;
            this.loadPatientList();
        });
    }

    loadPatientList =  () => {
        this.setState({loadingPatients: true}, async () => {
            const patients = await secretaryPatientsDao.getAllPatients();

            // this.patientStore.changePatients(patients);
            // const patientsToDisplay = this.patientStore.filterByType(this.state.patientFilterType);

            const patientsToDisplay = patients;
            
            this.setState({
                patientsToDisplay: patientsToDisplay,
                loadingPatients: false,
            })
        });
    }

    filterPatients = (type) => {
        this.setState({loadingPatients: true, patientFilterType: type}, async () => {
            setTimeout(() => {
                const patientsToDisplay = this.patientStore.filterByType(this.state.patientFilterType);

                this.setState({
                    patientsToDisplay: patientsToDisplay,
                    loadingPatients: false,
                })

            }, 700)
        });
    }

    render() {
        return (
            <ScreenLayout>
                <ControlHeader
                />
                <PatientList
                    patients={this.state.patientsToDisplay}
                    refreshing={this.state.loadingPatients}
                    onRefresh={this.loadPatientList}
                />
            </ScreenLayout>
        );
    }
}

const PatientList = (props) => {
    const patientCards = props.patients.map((patient, index) => {
        return (
            <PatientInfoCard
                key={`PatientCard_${patient.userId}`}
                patientInfo={patient}
                index={index}
                onPress={noop}
            />
        )
    })

    return (
        <ItemListContainer
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
        >
            {
                patientCards
            }
        </ItemListContainer>
    )
}

const ControlHeader = (props) => {
    const theme = useTheme();

    return (
        <Surface style={{elevation: 4}}>
            <TitleOnlyScreenHeader
                title="فهرست بیماران"
                style={{elevation: 0}}
            />
            <ConditionalCollapsibleRender hidden={false}>
            </ConditionalCollapsibleRender>
        </Surface>
    )
}

const PatientCard = (props) => {
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

    const visitIcon = props.patient.hasVisitHappened ? <AttendedVisitIcon/> : props.patient.expired ? <ExpiredVisitIcon/> : <FutureVisitIcon/>;

    return (
        <CardContainer index={props.index}
                       style={[{
                           // elevation: 4,
                       }, styles.patientCardContainer]}
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
                        <AppointmentInfoRows patient={props.patient}/>
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

    patientCardContainer: {},
});


