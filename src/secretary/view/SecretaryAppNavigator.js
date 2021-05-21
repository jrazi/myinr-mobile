import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import UnderConstruction from "../../root/view/screen/UnderConstruction";
import SecretaryApp from "./SecretaryApp";


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
                    component={UnderConstruction}
                    options={{ headerShown: false , headerTitle: props => null }}
                    initialParams={{ message: null, patientInfo: null, physicianInfo: null, patientMedicalInfo: null }}
                />
            </Stack.Navigator>
        );
    }
}
