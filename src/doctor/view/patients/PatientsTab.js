import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import PatientsScreen from "./PatientsScreen";
import PatientProfileScreen from "./profile/PatientProfileScreen";
import {FirstVisitScreen} from "./visit/first/FirstVisitScreen";

const Stack = createStackNavigator();

export const PatientsTab = (props) => {
    return (
        <Stack.Navigator
            initialRoute={'PatientsScreen'}
        >
            <Stack.Screen
                name={'PatientsScreen'}
                component={PatientsScreen}
                options={{ headerShown: false , headerTitle: props => null }}
            />
        </Stack.Navigator>
    )
}