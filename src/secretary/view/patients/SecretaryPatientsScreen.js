import React from "react";
import {rootDao} from "../../../root/data/dao/RootDao";
import {patientDao} from "../../../patient/data/dao/PatientDao";
import {ScreenLayout, TitleOnlyScreenHeader} from "../../../root/view/screen/Layout";
import {ItemListContainer} from "../../../root/view/list/ItemList";
import {Card, FAB, Surface, useTheme, withTheme} from "react-native-paper";
import {
    ConditionalCollapsibleRender,
    IntraSectionInvisibleDivider
} from "../../../doctor/view/patients/visit/first/forms/Layout";
import {StyleSheet, View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {secretaryPatientsDao} from "../../data/SecretaryPatientsDao";
import {PatientInfoCard} from "./PatientCard";
import {noop} from "../../../root/domain/util/Util";


class SecretaryPatientsScreen extends React.Component {
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

    navigateToPatientInfoScreen = (patientInfo) => {
        this.props.navigation.navigate(
            'PatientInfoScreen',
            {
                patientInfo: patientInfo,
            },
        );
    }

    navigateToPatientInsertScreen = () => {
        this.props.navigation.navigate(
            'PatientUpsertScreen',
            {
                patientInfo: null,
                isForEditingPatient: false,
            },
        );
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
                    onPatientCardPress={this.navigateToPatientInfoScreen}
                />
                <View style={styles.fabContainer}>
                    <ConditionalCollapsibleRender hidden={this.state.loadingPatients}>
                        <View style={styles.fabWrapper}>
                            <FAB
                                style={[styles.fab, {
                                    backgroundColor: this.props.theme.colors.actionColors.primary,
                                }]}
                                icon={'plus'}
                                onPress={this.navigateToPatientInsertScreen}
                            />
                        </View>
                    </ConditionalCollapsibleRender>
                </View>
            </ScreenLayout>
        );
    }
}

export default withTheme(SecretaryPatientsScreen);

const PatientList = (props) => {
    const patientCards = props.patients.map((patient, index) => {
        return (
            <PatientInfoCard
                key={`PatientCard_${patient.userId}`}
                patientInfo={patient}
                index={index}
                onPress={() => props.onPatientCardPress(patient)}
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
            <IntraSectionInvisibleDivider l/>
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


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
    },

    patientCardContainer: {},

    fabContainer: {
        position: 'absolute',
        margin: 24,
        left: 0,
        bottom: 0,
    },
    fabWrapper: {
        paddingTop: 15,
        alignItems: 'center',
    },
    fab: {
    },

});


