import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import SecretaryApp from "./SecretaryApp";
import SecretaryPatientInfoScreen from "./patientInfo/SecretaryPatientInfoScreen";


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
            </Stack.Navigator>
        );
    }
}
