import React from 'react';
import {StyleSheet, View, Alert} from "react-native";
import {Spacing, Theme} from "../../root/view/styles";
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
import {TextInput, Button, Text, Title, Headline, HelperText, Snackbar, Portal} from 'react-native-paper';
import {fullSize} from "../../root/view/styles/containers";
import {ErrorType, getErrorType} from "../../root/data/server/errors";
import {currentTheme} from "../../../theme";

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submissionStatus: FormSubmissionStatus.NOT_SUBMITTING,
            errorMessage: '',
            errorDialogOpen: false,
        }
    }


    submitForm = (credentials) => {
        this.props.onSubmissionUpdate(FormSubmissionStatus.SUBMITTING, () => {
            serverGateway.fetchUserDataWithLogin(credentials.username, credentials.password).then(user => {
                rootDao.saveUser(user).then(() => {
                    this.props.onSubmissionUpdate(FormSubmissionStatus.NOT_SUBMITTING, () => {
                        if (user.role === UserRole.PATIENT) this.props.navigation.navigate(Screen.PATIENT);
                        else if (user.role === UserRole.DOCTOR) this.props.navigation.navigate(Screen.DOCTOR);
                    });
                });
            }).catch(error => {
                this.props.onSubmissionUpdate(FormSubmissionStatus.NOT_SUBMITTING, () => {
                    const serverErrorType = getErrorType(error);
                    let message = '';
                    switch (serverErrorType) {
                        case ErrorType.RECORD_NOT_FOUND:
                            message = 'نام کاربری یا رمز عبور اشتباه است';
                            break;
                        default:
                            message = 'خطایی در ارتباط با سرور رخ داده است';
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
                    innerRef={this.props.containerRef}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validateOn
                    onSubmit={(values, { validate }) => {
                        this.submitForm(values);
                    }}
                >
                    {
                        ({ handleChange, handleBlur, values, touched, errors }) => {return (
                            <View style={styles.formContainer}>
                                <View style={styles.formTitle}>
                                    <Title>{Locale[rootDao.getLocale()].text.title.LOGIN_FORM}</Title>
                                    {/*<DefaultText style={styles.titleText} minimumFontScale={3}>{Locale[rootDao.getLocale()].text.title.LOGIN_FORM}</DefaultText>*/}
                                </View>
                                <View style={styles.formRow}>
                                    <TextInput
                                        label="نام کاربری"
                                        value={values.username}
                                        onChangeText={handleChange('username')}
                                        autoCompleteType={'username'}
                                        autoCorrect={false}
                                        onBlur={handleBlur('username')}
                                    />
                                    <HelperText type="error" visible={true} style={{color: currentTheme.colors.actionColors.remove}}>
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
                                    />
                                    <HelperText type="error" visible={true} style={{color: currentTheme.colors.actionColors.remove}}>
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
                            </View>
                        )}
                    }
                </Formik>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        paddingVertical: 40,
    },
    formContainer: {
        ...Spacing.px3P,
        ...Spacing.py2P,
    },
    formTitle: {
        alignSelf: 'center',
        ...Spacing.py2F,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'right',
    },
    formRow: {
        ...Spacing.py2F,
    }
});