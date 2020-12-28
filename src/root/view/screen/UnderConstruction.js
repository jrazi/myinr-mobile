import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {currentTheme} from "../../../../theme";

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
                <Icon name={'build'} size={100} color={currentTheme.colors.onBackground}></Icon>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: currentTheme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
});