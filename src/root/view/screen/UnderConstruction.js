import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {withTheme} from "react-native-paper";

class UnderConstruction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount = async () => {
    }

    render() {
        const theme = this.props.theme;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: theme.colors.background,
                alignItems: 'center',
                justifyContent: 'center',
            },
        });
        return (
            <View style={styles.container}>
                <Icon name={'build'} size={100} color={theme.colors.onBackground}></Icon>
            </View>
        );
    }
}

export default withTheme(UnderConstruction);