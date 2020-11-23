import {Button, TextInput, View, StyleSheet, I18nManager} from "react-native";
import React from "react";
import {Spacing, Borders, Locale} from "../styles";
import {DefaultText} from "../basic/Text";
import {rootDao} from "../../data/dao/RootDao";


export const DefaultTextInput = ({style, ...props}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.textInput, style]}
                {...props}
            >
                {props.children}
            </TextInput>
        </View>
    );
}

export const DefaultErrorField = (props) => {
    return (
        <DefaultText style={styles.defaultErrorField}>
            {props.error}
        </DefaultText>
    );
}

const styles = StyleSheet.create({
    container: {
        ...Spacing.px2,
        ...Spacing.py1,
        ...Borders.borderRadius.xs,
        ...Borders.defaultBorder,
    },
    defaultErrorField: {
        color: 'red',
        fontSize: 12,
    },
    textInput: {
        textAlign: I18nManager.isRTL ? 'right': 'left',
    }
});