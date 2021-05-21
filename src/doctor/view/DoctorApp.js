import React from 'react';
import {BottomNavigation, useTheme, withTheme} from "react-native-paper";
import HomeScreen from "./HomeScreen";
import AppointmentsScreen from "./visits/AppointmentsScreen";
import ProfileScreen from "./ProfileScreen";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {rootDao} from "../../root/data/dao/RootDao";
import {UserRole} from "../../root/domain/Role";
import PatientsScreen from "./patients/PatientsScreen";
import TeleVisitScreen from "./televisit/TeleVisitScreen";

const Tab = createMaterialBottomTabNavigator();

class DoctorApp extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loaded: false,
        }
    }

    componentDidMount() {
        this.setState({loaded: false}, () => {
            rootDao.getUser().then(user => {
                if (user == null) this.props.navigation.navigate('LOGIN');
                else if (user.userInfo.role != UserRole.DOCTOR) this.props.navigation.navigate('LOGIN');
                else this.user = user;
                this.setState({loaded: true});
            });
        });
    }

    render() {
        const theme = this.props.theme;
        return (
            <Tab.Navigator
                initialRouteName={"PatientsScreen"}
                barStyle={{ backgroundColor: theme.colors.surface,}}
                shifting={false}
                backBehavior={'history'}
                activeColor={theme.colors.accent}
                inactiveColor={theme.colors.backdrop}
                lazy={false}
            >
                <Tab.Screen
                    name="PatientsScreen"
                    component={PatientsScreen}
                    options={{
                        tabBarLabel: 'بیماران',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="clipboard-pulse-outline" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="VisitsScreen"
                    component={AppointmentsScreen}
                    options={{
                        tabBarLabel: 'ویزیت‌ها',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="clock-outline" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="TeleVisitScreen"
                    component={TeleVisitScreen}
                    options={{
                        tabBarLabel: 'تله‌ویزیت',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="message-text-outline" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: 'پروفایل من',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="account-outline" color={color} size={26} />
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
};

export default withTheme(DoctorApp);


