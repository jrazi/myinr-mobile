import React from "react";
import {Appbar} from "react-native-paper";
import {currentTheme, mostlyWhiteTheme} from "../../../../theme";
import {StyleSheet, View} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {hasValue} from "../../domain/util/Util";

export const ScreenLayout = (props) => {
    return (
        <View style={[styles.screenWrapper, props.style]}>
            {props.children}
        </View>
    )
}

export const ScreenHeader = ({style, title, navigation, ...props}) => {
    return (
        <CustomContentScreenHeader style={style} navigation={navigation}>
            <Appbar.Content color={currentTheme.colors.primary}  title={title}/>
        </CustomContentScreenHeader>
    );
}

export const CustomContentScreenHeader = (props) => {
    let navigation = null;
    if (hasValue(props.navigation))
        navigation = props.navigation;
    else navigation = useNavigation();

    let goBackAction = hasValue(props.onBack) ? () => {props.onBack(navigation)} : () => {navigation.goBack()};
    return (
        <Appbar.Header
            style={{
                paddingVertical: 40,
                paddingHorizontal: 10,
                borderBottomWidth: 0,
                ...props.style,
                // flexDirection: 'row',
                // justifyContent: 'space-around',
            }}
            theme={mostlyWhiteTheme}
        >
            {props.children}
            <Appbar.Action icon="arrow-left" onPress={goBackAction} color={currentTheme.colors.placeholder}/>
        </Appbar.Header>
    );
}

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        backgroundColor: currentTheme.colors.background,
    },
})