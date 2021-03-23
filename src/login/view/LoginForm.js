import React from 'react';
import {StyleSheet, View, Alert, Image, KeyboardAvoidingView} from "react-native";
import {Spacing} from "../../root/view/styles";
import {debugBorderBlue, debugBorderRed} from "../../root/view/styles/borders";
import {Formik} from "formik";
import * as Yup from 'yup';
import * as Validators from '../../root/view/form/Validators';
import {DefaultErrorField, DefaultTextInput} from "../../root/view/form/Form";
import * as Locale from './Locale';
import {rootDao} from "../../root/data/dao/RootDao";
import {DefaultText} from "../../root/view/basic/Text";
import {serverGateway} from "../../root/data/server/ServerGateway";
import {UserRole} from "../../root/domain/Role";
import {Screen} from "../../root/view/Screen";
import {FormSubmissionStatus} from "../../root/view/FormSubmissionStatus";
import {
    TextInput,
    Caption,
    Button,
    Text,
    Title,
    Headline,
    HelperText,
    Snackbar,
    Portal,
    withTheme,
    Subheading
} from 'react-native-paper';
import {fullSize} from "../../root/view/styles/containers";
import {ErrorType, getErrorType} from "../../root/data/server/errors";
import {ApplicationVersion} from "../../root/view/screen/Profile";


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submissionStatus: FormSubmissionStatus.NOT_SUBMITTING,
            errorMessage: '',
            errorDialogOpen: false,
        }
    }


    changeSubmissionStatus = (newStatus, callback) => {
        this.setState({submissionStatus: newStatus}, callback);
    }

    submitForm = (credentials) => {
        const reset = (routeName) => {
            this.props.navigation.reset({
                index: 0,
                routes: [{name: routeName}],
            });
        }
        this.changeSubmissionStatus(FormSubmissionStatus.SUBMITTING, () => {
            serverGateway.fetchUserDataWithLogin(credentials.username, credentials.password).then(async (data) => {
                const user = data.details;
                const token = data.accessToken;

                await rootDao.saveAccessToken(token);
                await rootDao.saveUser(user);

                this.changeSubmissionStatus(FormSubmissionStatus.NOT_SUBMITTING, () => {
                    if (user.userInfo.role === UserRole.PATIENT) reset(Screen.PATIENT);
                    else if (user.userInfo.role === UserRole.DOCTOR) reset(Screen.DOCTOR);
                });

            }).catch(error => {
                this.changeSubmissionStatus(FormSubmissionStatus.NOT_SUBMITTING, () => {
                    const code = error.code;
                    let message = '';
                    switch (code) {
                        case ErrorType.RECORD_NOT_FOUND:
                        case ErrorType.USERNAME_PASSWORD_MISMATCH:
                            message = 'نام کاربری یا رمز عبور اشتباه است';
                            break;
                        default:
                            message = 'خطا در ارتباط با سرور';
                            break;
                    }
                    this.setState({
                        errorDialogOpen: true,
                        errorMessage: message,
                    });
                });
            });
        })
    }

    render() {
        const theme = this.props.theme;
        return (
            <View style={styles.container}>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        username: Validators.USERNAME[rootDao.getLocale()],
                        password: Validators.PASSWORD[rootDao.getLocale()],
                    })}
                    // innerRef={this.props.containerRef}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validateOnSubmit={true}
                    onSubmit={(values, { validate }) => {
                        this.submitForm(values);
                    }}
                >
                    {
                        ({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => {return (
                            <View style={styles.formContainer}>
                                <View style={styles.formTitle}>
                                    <Title>سیستم مدیریت یکپارچه داده‌های INR</Title>
                                    {/*<DefaultText style={styles.titleText} minimumFontScale={3}>{Locale[rootDao.getLocale()].text.title.LOGIN_FORM}</DefaultText>*/}
                                </View>
                                <View style={styles.formBody}>
                                    <View style={styles.formRow}>
                                        <TextInput
                                            label="نام کاربری"
                                            value={values.username}
                                            onChangeText={handleChange('username')}
                                            autoCompleteType={'username'}
                                            autoCorrect={false}
                                            onBlur={handleBlur('username')}
                                            style={{
                                                paddingHorizontal: 20,
                                                backgroundColor: theme.colors.background,
                                            }}
                                        />
                                        <HelperText type="error" visible={true} style={{color: theme.colors.actionColors.remove}}>
                                            {errors.username}
                                        </HelperText>
                                    </View>
                                    <View style={styles.formRow}>
                                        <TextInput
                                            label="رمز عبور"
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            autoCorrect={false}
                                            secureTextEntry={true}
                                            autoCompleteType={'password'}
                                            onBlur={handleBlur('password')}
                                            style={{
                                                paddingHorizontal: 20,
                                                backgroundColor: theme.colors.background,
                                            }}
                                        />
                                        <HelperText type="error" visible={true} style={{color: theme.colors.actionColors.remove}}>
                                            {errors.password}
                                        </HelperText>
                                        <Portal>
                                            <View
                                                style={{
                                                    marginBottom: 80,
                                                    flex: 1,
                                                    paddingHorizontal: 20,
                                                }}
                                            >
                                                <Snackbar
                                                    style={{
                                                    }}
                                                    visible={this.state.errorDialogOpen}
                                                    onDismiss={() => {this.setState({errorDialogOpen: false})}}
                                                    action={{
                                                        label: 'بستن',
                                                        onPress: () => {this.setState({errorDialogOpen: false})},
                                                    }}>
                                                    {this.state.errorMessage}
                                                </Snackbar>
                                            </View>
                                        </Portal>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <Button
                                            style={{
                                                ...styles.loginButton,
                                            }}
                                            contentStyle={{
                                                ...styles.loginButtonContent,
                                            }}
                                            mode={'contained'}
                                            loading={this.state.submissionStatus == FormSubmissionStatus.SUBMITTING}
                                            disabled={this.state.submissionStatus == FormSubmissionStatus.SUBMITTING}
                                            onPress={handleSubmit}
                                        >
                                            <Subheading style={{color: theme.colors.onAccentBackground,}}>ورود</Subheading>
                                        </Button>
                                    </View>
                                </View>

                            </View>
                        )}
                    }
                </Formik>
                <View
                    style={{
                        zIndex: -1,
                        paddingTop: 10,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexShrink: 1,
                    }}
                >
                    <Image
                        source={require('../../../assets/inrDeviceMd-nobg.png')}
                        resizeMode={'contain'}
                        style={{
                            height: '100%',
                            aspectRatio: 1,
                        }}
                    />
                </View>
                <View>
                    <ApplicationVersion
                        versionPrefix={'نسخه '}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            paddingTop: 0,
                            paddingBottom: 5,
                            alignItems: 'flex-start',
                            paddingHorizontal: 15,
                        }}
                        contentStyle={{
                            fontSize: 14,
                        }}
                    />
                </View>
            </View>
        )
    }
}

export default withTheme(LoginForm);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        paddingTop: 40,
    },
    formContainer: {
        // ...Spacing.py2P,
        paddingTop: '8%',
    },
    formTitle: {
        alignSelf: 'center',
        ...Spacing.py2F,
        paddingHorizontal: 10,
    },
    formBody: {
        // ...Spacing.px3P,

    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'right',
    },
    formRow: {
        ...Spacing.py1F,
    },
    buttonContainer: {
        // ...Spacing.px3P,
        paddingHorizontal: 20,
        ...Spacing.py1F,
        // borderRadius: 3,
        // ...Spacing.py2,
    },
    loginButton: {
        // borderRadius: 0,
    },
    loginButtonContent: {
        paddingVertical: 5,
    },
});