import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import RootEntry from "./RootEntry";
import PatientApp from "../../patient/view/PatientApp";
import DoctorApp from "../../doctor/view/DoctorApp";
import {Screen} from "./Screen";
import LoginApp from "../../login/view/LoginApp";

const Stack = createStackNavigator();

export default class Navigator extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="ROOT" component={RootEntry} />
                    <Stack.Screen
                        name={Screen.LOGIN}
                        component={LoginApp}
                    />
                    <Stack.Screen
                        name={Screen.PATIENT}
                        component={PatientApp}
                    />
                    <Stack.Screen
                        name={Screen.DOCTOR}
                        component={DoctorApp}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
