import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import RootEntry from "./RootEntry";
import PatientApp from "../../patient/view/PatientApp";
import {Screen} from "./Screen";
import LoginScreen from "../../login/view/LoginScreen";
import DoctorAppNavigator from "../../doctor/view/DoctorAppNavigator";

const Stack = createStackNavigator();

export default class Navigator extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRoute={'ROOT'}
                >
                    <Stack.Screen
                        name={'ROOT'}
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
                        component={DoctorAppNavigator}
                        options={{ headerShown: false , headerTitle: props => null }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
