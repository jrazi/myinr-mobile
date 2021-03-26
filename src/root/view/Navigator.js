import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import RootEntry from "./RootEntry";

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
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
