import React from "react";
import {StyleSheet, Text, View} from "react-native";
import UnderConstruction from "../../root/view/screen/UnderConstruction";
import {useNavigation} from "@react-navigation/native";

class PatientsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {}
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("nav history", this.props.navigation);
        this.props.navigation.push('Doctor_PatientScreen');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("nav history", this.props.navigation);
        this.props.navigation.push('Doctor_PatientScreen');
        return true;
    }

    render() {
        return (
            <UnderConstruction/>
        );
    }
}

export default function(props) {
    const navigation = useNavigation();

    return <PatientsScreen {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});