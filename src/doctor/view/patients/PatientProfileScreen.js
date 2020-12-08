
import React from "react";
import {StyleSheet, View} from "react-native";
import {ScreenHeader, ScreenLayout} from "../../../root/view/screen/Layout";
import {Button, Text} from "react-native-paper";
import {rootDao} from "../../../root/data/dao/RootDao";
import {doctorDao} from "../../data/dao/DoctorDao";
import {hasValue} from "../../../root/domain/Util";
import {currentTheme} from "../../../../theme";
import HomeScreen from "../HomeScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PatientsScreen from "./PatientsScreen";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {debugBorderRed} from "../../../root/view/styles/borders";
import { FAB } from 'react-native-paper';
const Tab = createMaterialTopTabNavigator();

class PatientProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: {},
            loading: true,
        }
    }

    componentDidMount = () => {
        if (!hasValue(this.props.route.params.nationalId)) return;
        this.refresh();
    }

    refresh = () => {
        doctorDao.getPatientInfo(this.props.route.params.nationalId)
            .then(patient => this.setState({patient: patient, loading: false}))
            .catch(err => {})
    }

    render() {
        const colors = currentTheme.colors;
        return (
            <ScreenLayout>
                <ScreenHeader title={this.state.patient.fullName} style={{elevation: 0}}/>
                <Tab.Navigator
                    initialRouteName={"Home"}
                    barStyle={{ backgroundColor: colors.background }}
                    shifting={false}
                    backBehavior={'history'}
                    activeColor={currentTheme.colors.primary}
                    inactiveColor={currentTheme.colors.placeholder}
                    lazy={false}
                    tabBarOptions={{
                        // activeTintColor: currentTheme.colors.primary,
                        indicatorStyle: {
                            borderBottomWidth: 2,
                            borderColor: currentTheme.colors.primary,
                        },
                        labelStyle: {
                            fontSize: 14,
                        },
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            tabBarLabel: 'مشخصات',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="home-outline" color={color} size={26} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="PatientsTab"
                        component={HomeScreen}
                        options={{
                            tabBarLabel: 'ویزیت‌ها',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="clipboard-pulse-outline" color={color} size={26} />
                            ),
                        }}

                    />
                    <Tab.Screen
                        name="Visits"
                        component={HomeScreen}
                        options={{
                            tabBarLabel: 'آزمایش‌ها',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="clipboard-pulse-outline" color={color} size={26} />
                            ),
                        }}

                    />
                </Tab.Navigator>
                <FAB
                    style={styles.fab}
                    icon={'note-plus'}
                    onPress={() => console.log('Pressed')}
                />
            </ScreenLayout>
        );
    }
}

export default PatientProfileScreen;

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        left: 0,
        bottom: 0,
    },
})
