import React from "react";
import {currentTheme, mostlyWhiteTheme} from "../../../../../../theme";
import {StyleSheet, View, ScrollView} from "react-native";
import {Title, Caption, Headline, Divider, Text} from "react-native-paper";
import {hasValue, removeWhiteSpace} from "../../../../../root/domain/util/Util";
import {fullWidth} from "../../../../../root/view/styles/containers";

export const VisitScreen = (props) => {
    return (
        <ScrollView style={[styles.screenWrapper, props.style]}>
            {props.children}
        </ScrollView>
    )
}

export const FormSection = (props) => {
    return (
        <View style={styles.formSection}>
            {
                [
                    props.children,
                    props.divider ? <Divider style={{marginTop: 20,}}/> : null
                ]
            }

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
            {
                !hasValue(props.description) || removeWhiteSpace(props.description) == "" ? null :
                    <Caption>{props.description}</Caption>
            }
        </View>
    )
}

export const InputTitle = (props) => {
    return (
        <View style={styles.sectionTitle}>
            <Title style={{fontSize: 16}}>{props.title}</Title>
            {
                !hasValue(props.description) || removeWhiteSpace(props.description) == "" ? null :
                    <Caption >{props.description}</Caption>
            }
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

export const RowWithDivider = (props) => {
    return (
        [
            <Divider style={{marginBottom: 10,}}/>,
            <Row {...props}>{props.children}</Row>,
            <Divider style={{marginTop: 10,}}/>
        ]
    )
}

export const RowWithBottomDivider = (props) => {
    return (
        [
            <Row {...props}>{props.children}</Row>,
            <Divider style={{marginTop: 10,}}/>
        ]
    )
}

export const Row = (props) => {return (
    <View style={
        [styles.row,
            {
                justifyContent: props.justifyAround == true ?
                    'space-around' : props.justifyBetween == true ?
                        'space-between' : 'flex-start'
            },
        ]
    }>
        {props.children}
    </View>
)}
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

export const PrimaryText = (props) => {
    return (
        <Text style={{color: currentTheme.colors.primary}}/>
    )
}

export const IntraSectionDivider = (props) => {
    return (
        <View style={{
            paddingVertical: props.xs ? 5 : props.s ? 10 : props.m ? 20 : 20,
        }}>
            <Divider/>
        </View>
    )
}

export const IntraSectionInvisibleDivider = (props) => {
    return (
        <View style={{
            paddingVertical: props.xs ? 5 : props.s ? 10 : props.m ? 20 : 20,
        }}>
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
        alignItems: 'center',
        // paddingVertical: 10,
        flexWrap: 'nowrap'
    },
    itemsBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 10,
    },
    basicElement: {
        paddingHorizontal: 5,
        paddingVertical: 5,
    }
})
