import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import UnderConstruction from "../../root/view/screen/UnderConstruction";
import StupidButRealServerGateway from "../../root/data/server/StupidServer";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {};
        this.tempText = {};
    }

    componentDidMount = async () => {
        const server = new StupidButRealServerGateway();
        const patient = '1300689343';
        const doctor = '5040306938';
        const user = doctor;
        const result = await server.fetchUserDataWithLogin(user, '_' + user);

    }


    render() {
        return (
            <UnderConstruction/>
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