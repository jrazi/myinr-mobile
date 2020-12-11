import React from "react";
import {currentTheme, mostlyWhiteTheme} from "../../../../../../theme";
import {StyleSheet, View} from "react-native";
import {Title, Caption, Headline, Divider} from "react-native-paper";

export const VisitScreen = (props) => {
    return (
        <View style={[styles.screenWrapper, props.style]}>
            {props.children}
        </View>
    )
}

export const FormSection = (props) => {
    return (
        <View style={styles.formSection}>
            {props.children}
            <Divider style={{marginTop: 20,}}/>
        </View>
    )
}

export const ScreenTitle = (props) => {
    return (
        <View style={styles.screenTitle}>
            <Headline style={{color: currentTheme.colors.primary}}>{props.title}</Headline>
        </View>
    )
}

export const SectionTitle = (props) => {
    return (
        <View style={styles.sectionTitle}>
            <Title>{props.title}</Title>
            <Caption>{props.description}</Caption>
        </View>
    )
}

export const SectionDescription = (props) => {
    return (
        <View style={styles.sectionDescription}>
            <Caption>{props.description}</Caption>
        </View>
    )
}

export const GroupTitle = (props) => {
    return (
        <View style={styles.groupTitle}>
            <Title>{props.title}</Title>
        </View>
    )
}

export const InputArea = (props) => {
    return (
        <View style={styles.inputArea}>
            {props.children}
        </View>
    )
}

export const Row = (props) => {
    return (
        <View style={styles.row}>
            {props.children}
        </View>
    )
}

export const ItemsBox = (props) => {
    return (
        <View style={styles.itemsBox}>
            {props.children}
        </View>
    )
}

export const BasicElement = (props) => {
    return (
        <View style={styles.basicElement}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        backgroundColor: currentTheme.colors.surface,
        elevation: 0,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    formSection: {
        paddingTop: 20,
    },
    screenTitle: {
        paddingBottom: 15,
    },
    sectionTitle: {
        paddingBottom: 10,
    },
    sectionDescription: {

    },
    formTitle: {

    },
    groupTitle: {

    },
    inputArea: {

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    itemsBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    basicElement: {
        paddingHorizontal: 5,
        paddingVertical: 5,
    }
})
