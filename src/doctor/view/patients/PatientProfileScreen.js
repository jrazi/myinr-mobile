import React from "react";
import {StyleSheet, View} from "react-native";
import {ScreenHeader, ScreenLayout} from "../../../root/view/screen/Layout";
import {doctorDao, VisitState} from "../../data/dao/DoctorDao";
import {hasValue} from "../../../root/domain/util/Util";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {FAB, Title, withTheme} from 'react-native-paper';
import {StartVisitDialog} from "./VisitRedirect";

const Tab = createMaterialTopTabNavigator();

class PatientProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: {},
            loading: true,
            newVisitDialogOpen: false,
            visitState: null,
        }
    }

    componentDidMount = () => {
        if (!hasValue(this.props.route.params.userId)) return;
        this.refresh();
    }

    refresh = () => {
        doctorDao.getPatientInfo(this.props.route.params.userId)
            .then(patient => this.setState({patient: patient, loading: false}))
            .catch(err => {})

        doctorDao.getVisitState(this.props.route.params.userId)
            .then(visitState => this.setState({visitState: visitState}))
            .catch(err => {})
    }

    startVisitSession = (useCache) => {
        this.setState({newVisitDialogOpen: false}, () => {
            this.props.navigation.navigate(
                'VisitSessionScreen',
                {userId: this.props.route.params.userId, patientName: this.state.patient.fullName, useCache: useCache}
            );
        })
    }
    render() {
        const theme = this.props.theme;
        const colors = theme.colors;
        const NoData = (props) => {return (
            <View style={{backgroundColor: colors.background, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Title style={{}}>داده‌ای موجود نیست.</Title>
            </View>
        )}
        return (
            <ScreenLayout>
                <ScreenHeader
                    title={this.state.patient.fullName} style={{elevation: 0}}
                />
                <Tab.Navigator
                    initialRouteName={"Home"}
                    barStyle={{ backgroundColor: colors.background }}
                    style={{ backgroundColor: colors.background }}
                    sceneContainerStyle={{ backgroundColor: colors.background }}
                    shifting={false}
                    backBehavior={'history'}
                    activeColor={theme.colors.primary}
                    inactiveColor={theme.colors.placeholder}
                    lazy={false}
                    tabBarOptions={{
                        indicatorStyle: {
                            borderBottomWidth: 2,
                            borderBottomColor: theme.colors.accent,
                            backgroundColor: theme.colors.accent,
                        },
                        labelStyle: {
                            fontFamily: 'IranSans',
                            // color: theme.dark ? theme.colors.backdrop : theme.colors.primary,
                        },
                        tabStyle: {
                            backgroundColor: theme.dark ? theme.colors.surface : null,
                        },
                        activeTintColor: theme.colors.primary,
                        inactiveTintColor: theme.colors.backdrop,
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={NoData}
                        options={{
                            tabBarLabel: 'مشخصات',
                        }}
                    />
                    <Tab.Screen
                        name="PatientsTab"
                        component={NoData}
                        options={{
                            tabBarLabel: 'ویزیت‌ها',
                        }}

                    />
                    <Tab.Screen
                        name="Visits"
                        component={NoData}
                        options={{
                            tabBarLabel: 'آزمایش‌ها',
                        }}

                    />
                </Tab.Navigator>
                <FAB
                    style={styles.fab}
                    icon={'note-plus'}
                    onPress={() => this.setState({newVisitDialogOpen: true})}
                />
                <StartVisitDialog
                    visitState={this.state.visitState == VisitState.FOLLOWUP_VISIT ? VisitState.FIRST_VISIT : this.state.visitState} // TODO temp values
                    visible={this.state.newVisitDialogOpen}
                    onDismiss={() => this.setState({newVisitDialogOpen: false})}
                    onBeginNew={() => this.startVisitSession(false)}
                    onContinuePrevious={() => this.startVisitSession(true)}
                />
            </ScreenLayout>
        );
    }
}

export default withTheme(PatientProfileScreen);

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 24,
        left: 0,
        bottom: 0,
    },
})

