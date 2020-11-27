import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class UnderConstruction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount = async () => {
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon name={'build'} size={100}></Icon>
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