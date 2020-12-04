import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import UnderConstruction from "../../root/view/screen/UnderConstruction";
import StupidButRealServerGateway from "../../root/data/server/StupidServer";
import {rootDao} from "../../root/data/dao/RootDao";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {};
        this.tempText = {};
    }

    componentDidMount = async () => {
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