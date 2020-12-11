import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import DoctorApp from "../../doctor/view/DoctorApp";
import PatientProfileScreen from "../../doctor/view/patients/PatientProfileScreen";
import {FirstVisitScreen} from "./patients/visit/first/FirstVisitScreen";

const Stack = createStackNavigator();

export default class DoctorAppNavigator extends React.Component {
    constructor(props) {
        super(props);
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
                    initialParams={{ userId: null, useCache: true }}
                />
            </Stack.Navigator>
        );
    }
}
