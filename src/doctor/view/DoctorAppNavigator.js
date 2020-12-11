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

    componentDidMount() {
    }

    render() {
        return (
            <Stack.Navigator
                initialRoute={'WIP'}
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
                    initialParams={{ userId: null, patientName: null, useCache: true }}
                />
                <Stack.Screen
                    name={'WIP'}
                    component={FirstVisitScreen}
                    options={{ headerShown: false , headerTitle: props => null }}
                    initialParams={{ userId: 5130, patientName: 'فاطمه محمدکریمی', useCache: true }}
                />
            </Stack.Navigator>
        );
    }
}
