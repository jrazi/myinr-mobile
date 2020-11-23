import {Button, TextInput, View, StyleSheet} from "react-native";
import React from "react";
import {Spacing, Borders} from "../styles";
import {DefaultText} from "../basic/Text";


export const DefaultTextInput = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
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
    }
});