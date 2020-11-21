import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Theme, Spacing, Borders, Buttons} from "../styles";
import {DefaultText} from "../basic/Text";

export const DefaultButton = (props) => {
    return (
        <TouchableOpacity
            style={{...styles.button, ...props.style}}
            onPress = {props.onPress}
        >
            <DefaultText style={{color:'white'}}>{props.title}</DefaultText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: '20%'
    },
    button: {
        ...Buttons.defaultButton,
    }
});