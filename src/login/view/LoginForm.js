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
import {TextInput, Button, Text, Title, Headline, HelperText} from 'react-native-paper';

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submissionStatus: FormSubmissionStatus.NOT_SUBMITTING,
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
                    // TODO handle error
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
                    validateOnBlur={true}
                    onSubmit={values => this.submitForm(values)}
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
                                    <HelperText type="error" visible={true}>
                                        {errors.username}
                                    </HelperText>
                                    {/*<DefaultTextInput*/}
                                    {/*    placeholder={Locale[rootDao.getLocale()].text.form.USERNAME_PLACEHOLDER}*/}
                                    {/*    autoCompleteType={'username'}*/}
                                    {/*    autoCorrect={false}*/}
                                    {/*    value={values.username}*/}
                                    {/*    onChangeText={handleChange('username')}*/}
                                    {/*    onBlur={handleBlur('username')}*/}
                                    {/*    disabled={true}*/}
                                    {/*/>*/}
                                    {/*<DefaultErrorField error={errors.username}/>*/}
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
                                    {/*<DefaultTextInput*/}
                                    {/*    placeholder={Locale[rootDao.getLocale()].text.form.PASSWORD_PLACEHOLDER}*/}
                                    {/*    autoCorrect={false}*/}
                                    {/*    autoCompleteType={'password'}*/}
                                    {/*    secureTextEntry={true}*/}
                                    {/*    value={values.password}*/}
                                    {/*    onChangeText={handleChange('password')}*/}
                                    {/*    onBlur={handleBlur('password')}*/}
                                    {/*/>*/}
                                    <HelperText type="error" visible={true}>
                                        {errors.password}
                                    </HelperText>
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