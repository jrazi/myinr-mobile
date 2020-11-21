import React from 'react';
import {StyleSheet, Text, View} from "react-native";

export default class LoginApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount = async () => {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>LOGIN APP</Text>
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
