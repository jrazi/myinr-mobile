import React from "react";
import {StyleSheet, Text, View} from "react-native";
import UnderConstruction from "../../root/view/screen/UnderConstruction";
import {ScreenHeader, ScreenLayout} from "../../root/view/screen/Layout";

export default class VisitsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {}
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