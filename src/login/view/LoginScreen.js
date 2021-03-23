import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Buttons, Theme, Containers, Spacing, Borders} from '../../root/view/styles';
import {Layout} from "../../root/view/layout/Layout";
import {DefaultButton, DefaultSubmitButton} from "../../root/view/button/Buttons";
import {rootDao} from "../../root/data/dao/RootDao";
import * as Locale from "./Locale";
import LoginForm from "./LoginForm";
import {FormSubmissionStatus} from "../../root/view/FormSubmissionStatus";
import {UserRole} from "../../root/domain/Role";
import {Button, Provider as PaperProvider, Subheading, Title, withTheme} from 'react-native-paper';
import {lightTheme} from "../../../theme";

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.locale = rootDao.getLocale();
    }

    componentDidMount() {
        rootDao.getUser().then(user => {
            if (user == null) return;
            if (user.userInfo.role == UserRole.PATIENT) {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{name: 'PATIENT'}],
                });
            }
            else if (user.userInfo.role == UserRole.DOCTOR) {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{name: 'DOCTOR'}],
                });
            }
        });
    }


    render() {
        const theme = lightTheme;
        return (
            <PaperProvider theme={theme} >
                <Layout>
                    <View style={{
                        flex: 1,
                        backgroundColor: theme.colors.background,
                    }}>
                        <View style={styles.bodyContainer}>
                            <LoginForm
                                navigation={this.props.navigation}
                            />
                        </View>
                    </View>
                </Layout>
            </PaperProvider>
        );
    }
}

export default withTheme(LoginScreen);

const styles = StyleSheet.create({
    container: {
    },
    bodyContainer: {
        flexGrow: 1,
    },
    buttonContainer: {
        // ...Spacing.px3P,
        // ...Spacing.py2,
    },
    loginButton: {
        borderRadius: 0,
    },
    loginButtonContent: {
        paddingVertical: 10,
    },
});
