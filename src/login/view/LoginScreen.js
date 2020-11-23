import React from 'react';
import {StyleSheet, Text, View, Button} from "react-native";
import {Buttons, Theme, Containers, Spacing} from '../../root/view/styles';
import {Layout} from "../../root/view/layout/Layout";
import {DefaultButton} from "../../root/view/button/Buttons";
import {rootDao} from "../../root/data/dao/RootDao";
import * as Locale from "./Locale";
import LoginForm from "./LoginForm";


export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.locale = rootDao.getLocale();
        this.containerRef = React.createRef();
    }

    componentDidMount = () => {

    }

    onFormSubmit = (credentials) => {
        console.log('should be a here');
        this.containerRef.current.handleSubmit();
        console.log('form submit login scree');
    }

    render() {
        return (
            <Layout>
                <View style={styles.container}>
                    <View style={styles.bodyContainer}>
                        <LoginForm
                            navigation={this.props.navigation}
                            containerRef={this.containerRef}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <DefaultButton
                            style={styles.loginButton}
                            title={Locale[this.locale].text.button.LOGIN}
                            onPress={() => {this.onFormSubmit()}}
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
