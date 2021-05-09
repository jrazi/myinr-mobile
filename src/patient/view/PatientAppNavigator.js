import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import PatientApp from "./PatientApp";
import MessageFromPhysicianScreen from "./message/received/MessageFromPhysicianScreen";
import MessageFromPatientScreen from "./message/received/MessageFromPatientScreen";

const Stack = createStackNavigator();

export default class PatientAppNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <Stack.Navigator
                initialRoute={'PatientApp'}
            >
                <Stack.Screen
                    name={'PatientApp'}
                    component={PatientApp}
                    options={{ headerShown: false , headerTitle: props => null }}
                />
                <Stack.Screen
                    name={'MessageFromPhysicianScreen'}
                    component={MessageFromPhysicianScreen}
                    options={{ headerShown: false , headerTitle: props => null }}
                    initialParams={{ message: null, patientInfo: null, physicianInfo: null, patientMedicalInfo: null }}
                />
                <Stack.Screen
                    name={'MessageFromPatientScreen'}
                    component={MessageFromPatientScreen}
                    options={{ headerShown: false , headerTitle: props => null }}
                    initialParams={{ message: null, patientInfo: null, physicianInfo: null, patientMedicalInfo: null }}
                />
            </Stack.Navigator>
        );
    }
}
