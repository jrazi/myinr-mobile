import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {BottomNavigation} from "react-native-paper";
import HomeScreen from "./HomeScreen";
import PatientsScreen from "./PatientsScreen";
import VisitsScreen from "./VisitsScreen";
import ProfileScreen from "./ProfileScreen";

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
    }

    render() {
        const renderScene = BottomNavigation.SceneMap({
            home: HomeScreen,
            patients: PatientsScreen,
            visits: VisitsScreen,
            profile: ProfileScreen,
        });

        // const colors = DefaultTheme.colors;
        return (
            <BottomNavigation
                navigationState={{index: this.state.index, routes: this.state.routes}}
                onIndexChange={(index) => {this.setState({index: index})}}
                renderScene={renderScene}
                shifting={false}
                // theme={{ colors: {primary: '#FFFFFF', background: '#E744AB'} }}
            />
        );
    }
};



export default DoctorApp;