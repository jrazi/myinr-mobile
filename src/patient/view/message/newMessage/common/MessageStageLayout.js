import React from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import {
    Title,
    Caption,
    Headline,
    Divider,
    Text,
    Chip,
    HelperText,
    useTheme
} from "react-native-paper";


export const NormalText = ({style, ...props}) => {
    return (
        <Text
            style={{
                ...style
            }}
            {...props}
        />
    )
}

export const DescriptionText = ({style, ...props}) => {
    return (
        <NormalText
            style={{
                textAlign: 'justify',
                ...style,
            }}
            {...props}
        />
    )
}

export const SectionDescriptionText = ({style, ...props}) => {
    return (
        <DescriptionText
            style={{
                fontSize: 15,
                ...style,
            }}
            {...props}
        />
    )
}
