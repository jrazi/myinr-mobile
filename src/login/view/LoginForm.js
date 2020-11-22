import React from 'react';
import {StyleSheet, Text, View, Button, TextInput} from "react-native";
import {Spacing, Theme} from "../../root/view/styles";
import {debugBorderBlue, debugBorderRed} from "../../root/view/styles/borders";
import {Formik} from "formik";
import {DefaultTextInput} from "../../root/view/form/Form";


export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>HI THERE</Text>
                <Formik
                    initialValues={{ email: '' }}
                    onSubmit={values => console.log(values)}
                >
                    <View style={styles.formContainer}>
                        <DefaultTextInput
                            placeholder={"Username"}
                        />
                    </View>
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
    }
});