import React from 'react';
import {BottomNavigation, useTheme, withTheme} from "react-native-paper";
import ProfileScreen from "./ProfileScreen";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {rootDao} from "../../root/data/dao/RootDao";
import {UserRole} from "../../root/domain/Role";
import MessageListScreen from "./MessageListScreen";
import AppointmentsScreen from "./AppointmentsScreen";
import WarfarinScreen from "./WarfarinScreen";

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
            else if (user.userInfo.role !== UserRole.PATIENT) this.props.navigation.navigate('LOGIN');
            else this.user = user;
        });
    }

    render() {
        const colors = this.props.theme.colors;
        const theme = this.props.theme;
        return (
            <Tab.Navigator
                initialRouteName={"patient/home"}
                barStyle={{ backgroundColor: theme.colors.surface,}}
                shifting={false}
                backBehavior={'history'}
                activeColor={theme.colors.accent}
                inactiveColor={theme.colors.backdrop}
                lazy={false}
            >
                <Tab.Screen
                    name="patient/warfarin"
                    component={WarfarinScreen}
                    options={{
                        tabBarLabel: 'وارفارین',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="pill" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="patient/messages"
                    component={MessageListScreen}
                    options={{
                        tabBarLabel: 'پیام‌ها',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="message-text-outline" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="patient/visits"
                    component={AppointmentsScreen}
                    options={{
                        tabBarLabel: 'ویزیت‌ها',
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

export default withTheme(PatientApp);



