import React from 'react';
import {StyleSheet, Text, View, Button} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Screen} from "./Screen";
import {UserRole} from "../domain/Role";
import {rootDao as _rootDao} from "../data/dao/RootDao";

export default class RootEntry extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {};
        this.rootDao = _rootDao;
    }

    componentDidMount = () => {
        this.rootDao.getUser().then(user => {
            if (user == null) this.props.navigation.navigate(Screen.LOGIN);
            else if (user.role === UserRole.PATIENT) this.props.navigation.navigate(Screen.PATIENT);
            else if (user.role === UserRole.DOCTOR) this.props.navigation.navigate(Screen.DOCTOR);
        })
    }

    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});