import React from "react";
import {StyleSheet, View} from "react-native";
import {ScreenHeader, ScreenLayout} from "../../../../root/view/screen/Layout";
import {doctorDao, VisitState} from "../../../data/dao/DoctorDao";
import {hasValue} from "../../../../root/domain/util/Util";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {FAB, Title, withTheme} from 'react-native-paper';
import {FirstVisitTab} from "./FirstVisitTab";
import {SecondaryVisitTab} from "./SecondaryVisitTab";

const Tab = createMaterialTopTabNavigator();
export const PatientProfileContext = React.createContext({patient: {}, visitState: {}, firstVisit: {}, visits: []});

class PatientProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: {},
            loading: true,
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

    render() {
        const theme = this.props.theme;
        const colors = theme.colors;
        const NoData = (props) => {return (
            <View style={{backgroundColor: colors.background, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Title style={{}}>داده‌ای موجود نیست.</Title>
            </View>
        )}
        return (
            <PatientProfileContext.Provider
                value={{patient: this.state.patient, visitState: this.state.visitState, firstVisit: {}, visits: []}}
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



