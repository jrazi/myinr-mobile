import React from 'react';
import {StyleSheet, Text, View, Button, TextInput} from "react-native";
import {Spacing, Theme} from "../../root/view/styles";
import {debugBorderBlue, debugBorderRed} from "../../root/view/styles/borders";
import {Formik} from "formik";
import {DefaultTextInput} from "../../root/view/form/Form";
import * as Locale from './Locale';
import {rootDao} from "../../root/data/dao/RootDao";

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    submitForm = (credentials) => {
        console.log('form is submitted login form', credentials);
    }

    render() {
        return (
            <View style={styles.container}>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    innerRef={this.props.containerRef}
                    onSubmit={values => this.submitForm(values)}
                >
                    {
                        ({ handleChange, handleBlur, values, touched, errors }) => {return (
                            <View style={styles.formContainer}>
                                <View style={styles.formTitle}>
                                    <Text style={styles.titleText} minimumFontScale={3}>{Locale[rootDao.getLocale()].text.title.LOGIN_FORM}</Text>
                                </View>
                                <View style={styles.formRow}>
                                    <DefaultTextInput
                                        placeholder={"Username"}
                                        autoCompleteType={'username'}
                                        autoCorrect={false}
                                        value={values.username}
                                        onChangeText={handleChange('username')}
                                    />
                                </View>
                                <View style={styles.formRow}>
                                    <DefaultTextInput
                                        placeholder={"Password"}
                                        autoCorrect={false}
                                        autoCompleteType={'password'}
                                        secureTextEntry={true}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                    />
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
        justifyContent: 'center',
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
        fontSize: 20,

    },
    formRow: {
        ...Spacing.py2F,
    }
});