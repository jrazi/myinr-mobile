import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import RootEntry from "./RootEntry";
import PatientApp from "../../patient/view/PatientApp";
import DoctorApp from "../../doctor/view/DoctorApp";
import {Screen} from "./Screen";
import LoginScreen from "../../login/view/LoginScreen";

const Stack = createStackNavigator();

export default class Navigator extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="ROOT"
                        component={RootEntry}
                        options={{ headerShown: false , headerTitle: props => null }}
                    />
                    <Stack.Screen
                        name={Screen.LOGIN}
                        component={LoginScreen}
                        options={{ headerShown: false , headerTitle: props => null }}
                    />
                    <Stack.Screen
                        name={Screen.PATIENT}
                        component={PatientApp}
                        options={{ headerShown: false , headerTitle: props => null }}
                    />
                    <Stack.Screen
                        name={Screen.DOCTOR}
                        component={DoctorApp}
                        options={{ headerShown: false , headerTitle: props => null }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
