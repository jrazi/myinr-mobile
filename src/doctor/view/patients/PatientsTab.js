import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import PatientsScreen from "./PatientsScreen";
import PatientProfileScreen from "./PatientProfileScreen";

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
            <Stack.Screen
                name={'PatientProfileScreen'}
                component={PatientProfileScreen}
                options={{ headerShown: false , headerTitle: props => null }}
                initialParams={{ userId: null }}
            />
        </Stack.Navigator>
    )
}