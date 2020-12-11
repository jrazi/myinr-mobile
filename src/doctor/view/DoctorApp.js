import React from 'react';
import {BottomNavigation, useTheme} from "react-native-paper";
import HomeScreen from "./HomeScreen";
import VisitsScreen from "./VisitsScreen";
import ProfileScreen from "./ProfileScreen";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {rootDao} from "../../root/data/dao/RootDao";
import {UserRole} from "../../root/domain/Role";
import {currentTheme, theme} from "../../../theme";
import {PatientsTab} from "./patients/PatientsTab";
import PatientsScreen from "./patients/PatientsScreen";

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
        this.props.navigation.navigate("WIP");
        this.setState({loaded: false}, () => {
            rootDao.getUser().then(user => {
                if (user == null) this.props.navigation.navigate('LOGIN');
                else if (this.user.role = UserRole.PATIENT) this.props.navigation.navigate('LOGIN');
                else this.user = user;
                this.setState({loaded: true});
            });
        });
    }

    render() {
        const colors = this.props.defaultTheme.colors;
        return (
            <Tab.Navigator
                initialRouteName={"Home"}
                barStyle={{ backgroundColor: colors.background }}
                shifting={false}
                backBehavior={'history'}
                activeColor={currentTheme.colors.primary}
                inactiveColor={currentTheme.colors.placeholder}
                lazy={false}
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
        );
    }
};

export default function(props) {
    // const navigation = useNavigation();
    const defaultTheme = useTheme();

    return <DoctorApp {...props} defaultTheme={defaultTheme}/>;
}


