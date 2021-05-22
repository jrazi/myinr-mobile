import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import SecretaryApp from "./SecretaryApp";
import SecretaryPatientInfoScreen from "./patientInfo/SecretaryPatientInfoScreen";
import PatientUpsertScreen from "./patientUpsert/PatientUpsertScreen";


const Stack = createStackNavigator();

export default class SecretaryAppNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <Stack.Navigator
                initialRoute={'SecretaryApp'}
            >
                <Stack.Screen
                    name={'SecretaryApp'}
                    component={SecretaryApp}
                    options={{ headerShown: false , headerTitle: props => null }}
                />
                <Stack.Screen
                    name={'PatientInfoScreen'}
                    component={SecretaryPatientInfoScreen}
                    options={{ headerShown: false , headerTitle: props => null }}
                    initialParams={{ patientInfo: null }}
                />
                <Stack.Screen
                    name={'PatientUpsertScreen'}
                    component={PatientUpsertScreen}
                    options={{ headerShown: false , headerTitle: props => null }}
                    initialParams={{ isForEditingPatient: false, patientInfo: null }}
                />
            </Stack.Navigator>
        );
    }
}
