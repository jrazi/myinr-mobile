import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {BottomNavigation, useTheme} from "react-native-paper";
import HomeScreen from "./HomeScreen";
import PatientsScreen from "./PatientsScreen";
import VisitsScreen from "./VisitsScreen";
import ProfileScreen from "./ProfileScreen";
import {useNavigation} from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {rootDao} from "../../root/data/dao/RootDao";
import {UserRole} from "../../root/domain/Role";

const Tab = createMaterialBottomTabNavigator();

class DoctorApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'home', title: 'خانه', icon: 'home-outline' },
                { key: 'patients', title: 'بیماران', icon: 'clipboard-pulse-outline' },
                { key: 'visits', title: 'ویزیت‌ها', icon: 'clock-outline' },
                { key: 'profile', title: 'پروفایل من', icon: 'account-outline' },
            ]
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
        const renderScene = BottomNavigation.SceneMap({
            home: HomeScreen,
            patients: PatientsScreen,
            visits: VisitsScreen,
            profile: ProfileScreen,
        });

        const colors = this.props.defaultTheme.colors;
        return (
            <Tab.Navigator
                initialRouteName={"Home"}
                barStyle={{ backgroundColor: colors.background }}
                shifting={false}
                backBehavior={'history'}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'خانه',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home-outline" color={color} size={26} />
                        ),
                    }}
                />
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
                    component={VisitsScreen}
                    options={{
                        tabBarLabel: 'ویزیت‌ها',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="clock-outline" color={color} size={26} />
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
            // <BottomNavigation
            //     navigationState={{index: this.state.index, routes: this.state.routes}}
            //     onIndexChange={(index) => {this.pushScreen(index); this.setState({index: index})}}
            //     renderScene={renderScene}
            //     shifting={false}
            //     // theme={{ colors: {primary: '#FFFFFF', background: '#E744AB'} }}
            // />
        );
    }
};

export default function(props) {
    // const navigation = useNavigation();
    const defaultTheme = useTheme();

    return <DoctorApp {...props} defaultTheme={defaultTheme}/>;
}


