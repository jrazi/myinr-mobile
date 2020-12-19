import React from 'react';
import {StyleSheet, Text, View, Button, I18nManager} from "react-native";
import {ActivityIndicator, Colors} from 'react-native-paper';
import {StatusBar} from "expo-status-bar";
import {Screen} from "./Screen";
import {UserRole} from "../domain/Role";
import {rootDao} from "../data/dao/RootDao";
import {Locale} from '../domain/Locale';
import {LoadingScreen} from "./loading/Loading";

export default class RootEntry extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {};
    }

    componentDidMount = () => {
        this.refresh();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.refresh();
    }

    refresh = () => {
        rootDao.getUser().then(user => {
            if (user == null) this.props.navigation.navigate(Screen.LOGIN);
            else if (user.role === UserRole.PATIENT) this.props.navigation.navigate(Screen.PATIENT);
            else if (user.role === UserRole.DOCTOR) this.props.navigation.navigate(Screen.DOCTOR);
        }).catch(err => {

        });
    }

    render() {
        return (
            <LoadingScreen loaded={false}></LoadingScreen>
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