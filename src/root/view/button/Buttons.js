import React from 'react';
import  {StyleSheet, Text, TouchableOpacity, View, TouchableHighlight, TouchableWithoutFeedback, Pressable, Keyboard} from "react-native";
import {Theme, Spacing, Borders, Buttons} from "../styles";
import {DefaultText} from "../basic/Text";
import {FormSubmissionStatus} from "../FormSubmissionStatus";

export const DefaultButton = ({style, ...props}) => {
    return (
        <Pressable
            {...props}
            style={[styles.button, style]}
            // activeOpacity={0.3}
            underlayColor={'gray'}
        >
            <DefaultText style={{color:'white'}}>{props.title}</DefaultText>
        </Pressable>
    );
}

export const DefaultSubmitButton = ({style, submissionStatus, onPress, disabled, ...props}) => {
    const isSubmitting = submissionStatus == FormSubmissionStatus.SUBMITTING;
    const styleForActiveStatus = isSubmitting ? styles.activeButton : styles.inactiveButton;

    return (
        <DefaultButton
            {...props}
            style={[style, styleForActiveStatus]}
            onPress={() => {Keyboard.dismiss(); onPress()}}
            disabled={disabled || isSubmitting}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: '20%'
    },
    button: {
        ...Buttons.defaultButton,
    },
    activeButton: {
        opacity: 0.5,
    },
    inactiveButton: {
        opacity: 1.0,
    }
});