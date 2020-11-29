import React from 'react';
import {BottomNavigation, useTheme} from "react-native-paper";
import HomeScreen from "./HomeScreen";
import ReportsScreen from "./ReportsScreen";
import MyDoctorScreen from "./MyDoctorScreen";
import ProfileScreen from "./ProfileScreen";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {rootDao} from "../../root/data/dao/RootDao";
import {UserRole} from "../../root/domain/Role";
import {currentTheme} from "../../../App";

const Tab = createMaterialBottomTabNavigator();

class PatientApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        }
        this.user = {};
    }

    componentDidMount() {
        rootDao.getUser().then(user => {
            if (user == null) this.props.navigation.navigate('LOGIN');
            else if (this.user.role = UserRole.PATIENT) this.props.navigation.navigate('LOGIN');
            else this.user = user;
        });
    }

    render() {
        const colors = this.props.defaultTheme.colors;
        return (
            <Tab.Navigator
                initialRouteName={"patient/home"}
                barStyle={{ backgroundColor: colors.background }}
                shifting={false}
                backBehavior={'history'}
                activeColor={currentTheme.colors.primary}
                inactiveColor={currentTheme.colors.placeholder}
            >
                <Tab.Screen
                    name="patient/home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'خانه',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home-outline" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="patient/reports"
                    component={ReportsScreen}
                    options={{
                        tabBarLabel: 'گزارشات',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="clipboard-pulse-outline" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="patient/doctor"
                    component={MyDoctorScreen}
                    options={{
                        tabBarLabel: 'پزشک من',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="stethoscope" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="patient/profile"
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

export default function(props) {
    // const navigation = useNavigation();
    const defaultTheme = useTheme();

    return <PatientApp {...props} defaultTheme={defaultTheme}/>;
}


