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
import {Button, Subheading, Title, withTheme} from 'react-native-paper';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submissionStatus: FormSubmissionStatus.NOT_SUBMITTING,
        };
        this.locale = rootDao.getLocale();
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        rootDao.getUser().then(user => {
            if (user == null) return;
            if (user.role == UserRole.PATIENT) {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{name: 'PATIENT'}],
                });
            }
            else if (user.role == UserRole.DOCTOR) {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{name: 'DOCTOR'}],
                });
            }
        });
    }

    changeSubmissionStatus = (newStatus, callback) => {
        this.setState({submissionStatus: newStatus}, callback);
    }
    onFormSubmit = (credentials) => {
        this.containerRef.current.handleSubmit();
    }

    render() {
        const theme = this.props.theme;
        return (
            <Layout>
                <View style={{
                    flex: 1,
                    backgroundColor: theme.colors.background,
                }}>
                    <View style={styles.bodyContainer}>
                        <LoginForm
                            navigation={this.props.navigation}
                            containerRef={this.containerRef}
                            onSubmissionUpdate={this.changeSubmissionStatus}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.loginButton}
                            contentStyle={styles.loginButtonContent}
                            mode={'contained'}
                            loading={this.state.submissionStatus == FormSubmissionStatus.SUBMITTING}
                            disabled={this.state.submissionStatus == FormSubmissionStatus.SUBMITTING}
                            onPress={() => {this.onFormSubmit()}}
                        >
                            <Subheading style={{color: theme.colors.background}}>{Locale[this.locale].text.button.LOGIN}</Subheading>
                        </Button>
                    </View>
                </View>
            </Layout>
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
