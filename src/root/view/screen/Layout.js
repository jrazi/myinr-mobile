import React from "react";
import {Appbar} from "react-native-paper";
import {currentTheme, mostlyWhiteTheme} from "../../../../theme";
import {StyleSheet, View} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {fullSize} from "../styles/containers";

export const ScreenLayout = (props) => {
    return (
        <View style={styles.screenWrapper}>
            {props.children}
        </View>
    )
}

export const ScreenHeader = (props) => {
    let navigation = useNavigation();
    return (
        <Appbar.Header
            style={{
                paddingVertical: 40,
                paddingHorizontal: 10,
            }}
            theme={mostlyWhiteTheme}
        >
            <Appbar.Content color={currentTheme.colors.primary} title={props.title}  />
            <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} color={currentTheme.colors.placeholder}/>
        </Appbar.Header>
    );
}

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
    },
})