import React from 'react';
import {StyleSheet, Text, View, Button} from "react-native";
import {Buttons, Theme, Containers, Spacing} from '../../root/view/styles';
import {Layout} from "../../root/view/layout/Layout";
import {DefaultButton} from "../../root/view/button/Buttons";

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount = async () => {
    }

    render() {
        return (
            <Layout>
                <View style={styles.container}>
                    <View style={styles.bodyContainer}>
                        <Text>LOGIN APP</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <DefaultButton style={styles.loginButton}
                            title={"ورود"}
                        />
                    </View>
                </View>
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bodyContainer: {
        ...Theme.bgDanger,

        flexGrow: 1,
    },
    buttonContainer: {
        ...Spacing.px3,
        ...Spacing.py2,
    },
    loginButton: {
        backgroundColor: Theme.themeColors.background.primaryBlack,
    }
});
