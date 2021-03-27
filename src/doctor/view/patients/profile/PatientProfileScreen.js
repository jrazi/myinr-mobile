import React from "react";
import {StyleSheet, View} from "react-native";
import {ScreenHeader, ScreenLayout} from "../../../../root/view/screen/Layout";
import {doctorDao} from "../../../data/dao/DoctorDao";
import {hasValue} from "../../../../root/domain/util/Util";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {FAB, Title, withTheme} from 'react-native-paper';
import {FirstVisitTab} from "./FirstVisitTab";
import {SecondaryVisitTab} from "./SecondaryVisitTab";
import {LoadingScreen} from "../../../../root/view/loading/Loading";
import {PatientProfileContext} from "./ContextProvider";

const Tab = createMaterialTopTabNavigator();

class PatientProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: {},
            loaded: false,
            firstVisit: {},
        }
        this.patientInfoLoaded = false;
        this.visitInfoLoaded = false;
    }

    componentDidMount = () => {
        if (!hasValue(this.props.route.params.userId)) return;
        this.refresh();
    }

    updateLoadedStatus = () => {
        let loaded = false;
        if (this.patientInfoLoaded &&  this.visitInfoLoaded)
            loaded = true;
        this.setState({loaded: loaded});
    }

    refresh = () => {
        this.patientInfoLoaded = false;
        this.visitInfoLoaded = false;
        this.setState({loaded: false}, () => {
            doctorDao.getPatientInfo(this.props.route.params.userId)
                .then(patient => {
                    this.setState({patient: patient});
                    this.patientInfoLoaded = true;
                    this.updateLoadedStatus();
                })
                .catch(err => {
                    console.warn('Error loading patient profile', err);
                })

            doctorDao.getLocalFirstVisit(this.props.route.params.userId, true)
                .then(firstVisit => {
                    this.setState({firstVisit: firstVisit});
                    this.visitInfoLoaded = true;
                    this.updateLoadedStatus();
                })
                .catch(err => {
                    console.warn('Patient Profile: Error loading first visit', err);
                })
        });
    }

    endFirstVisit = () => {
        this.state.firstVisit.visitInfo.flags.isEnded = true;
        this.setState({firstVisit: this.state.firstVisit});
    }

    render() {
        const theme = this.props.theme;
        const colors = theme.colors;
        const NoData = (props) => {return (
            <View style={{backgroundColor: colors.background, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Title style={{}}>داده‌ای موجود نیست.</Title>
            </View>
        )}
        if (!this.state.loaded) return <LoadingScreen loaded={this.state.loaded}/>;
        return (
            <PatientProfileContext.Provider
                value={{patient: this.state.patient, firstVisit: this.state.firstVisit, endFirstVisit: this.endFirstVisit,  visits: []}}
            >
                <ScreenLayout>
                    <ScreenHeader
                        title={this.state.patient.fullName} style={{elevation: 0}}
                    />
                    <Tab.Navigator
                        initialRouteName={"FirstVisit"}
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
                            name="PatientInfo"
                            component={NoData}
                            options={{
                                tabBarLabel: 'مشخصات',
                            }}
                            params={{
                                userId: this.props.route.params.userId,
                            }}
                            initialParams={{
                                userId: this.props.route.params.userId,
                            }}
                        />
                        <Tab.Screen
                            name="FirstVisit"
                            component={FirstVisitTab}
                            options={{
                                tabBarLabel: 'ویزیت اول',
                            }}
                            initialParams={{
                                userId: this.props.route.params.userId,
                            }}
                        />
                        <Tab.Screen
                            name="SecondaryVisits"
                            component={SecondaryVisitTab}
                            options={{
                                tabBarLabel: 'ویزیت‌ها',
                            }}
                            initialParams={{
                                userId: this.props.route.params.userId,
                            }}
                        />
                    </Tab.Navigator>
                </ScreenLayout>
            </PatientProfileContext.Provider>
        );
    }
}

export default withTheme(PatientProfileScreen);



