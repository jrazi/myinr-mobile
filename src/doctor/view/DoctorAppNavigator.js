import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DoctorApp from "../../doctor/view/DoctorApp";
import PatientProfileScreen from "./patients/profile/PatientProfileScreen";
import FirstVisitScreen from "./patients/visit/first/FirstVisitScreen";
import SettingsScreen from "./SettingsScreen";
import FollowupVisitScreen from "./patients/visit/followup/FollowupVisitScreen";
import TeleVisitSessionScreen from "./patients/televisit/TeleVisitSessionScreen";

const Stack = createStackNavigator();

export default class DoctorAppNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <Stack.Navigator
                initialRoute={'DoctorApp'}
            >
                <Stack.Screen
                    name={'DoctorApp'}
                    component={DoctorApp}
                    options={{ headerShown: false , headerTitle: props => null }}
                />
                <Stack.Screen
                    name={'PatientProfileScreen'}
                    component={PatientProfileScreen}
                    options={{ headerShown: false , headerTitle: props => null }}
                    initialParams={{ userId: null }}
                />
                <Stack.Screen
                    name={'VisitSessionScreen'}
                    component={FirstVisitScreen}
                    options={{ headerShown: false , headerTitle: props => null }}
                    initialParams={{ userId: null, patientName: null, useCache: true, readonly: false, fetchRemote: false }}
                />
                <Stack.Screen
                    name={'FollowupVisitRoot'}
                    component={FollowupVisitScreen}
                    options={{ headerShown: false , headerTitle: props => null }}
                    initialParams={{ userId: null, patientName: null, useCache: false, readonly: false, fetchRemote: false, visitInfo: {} }}
                />
                <Stack.Screen
                    name={'TeleVisitSessionScreen'}
                    component={TeleVisitSessionScreen}
                    options={{ headerShown: false , headerTitle: props => null }}
                    initialParams={{ userId: null, readonly: false, messageId: null, }}
                />
                <Stack.Screen
                    name={'SettingsScreen'}
                    component={SettingsScreen}
                    options={{ headerShown: false , headerTitle: props => null }}
                    initialParams={{ userId: null, userInfo: {} }}
                />
            </Stack.Navigator>
        );
    }
}

