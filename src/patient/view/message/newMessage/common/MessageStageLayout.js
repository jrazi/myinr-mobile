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


export const NormalText = (props) => {
    return (
        <Text
            {...props}
        />
    )
}

export const DescriptionText = (props) => {
    return <NormalText {...props}/>
}

export const SectionDescriptionText = (props) => {
    return (
        <DescriptionText
            style={{
                fontSize: 15,
            }}
            {...props}
        />
    )
}
