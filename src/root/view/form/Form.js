import {Button, TextInput, View, StyleSheet} from "react-native";
import React from "react";
import {Spacing, Borders} from "../styles";


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

const styles = StyleSheet.create({
    container: {
        ...Spacing.px2,
        ...Spacing.py1,
        ...Borders.borderRadius.xs,
        ...Borders.defaultBorder,
    },
});