import React from "react";
import {Appbar, useTheme} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {firstNonEmpty, hasValue, noop} from "../../domain/util/Util";

export const ScreenLayout = (props) => {
    const styles = StyleSheet.create({
        screenWrapper: {
            flex: 1,
            backgroundColor: useTheme().colors.background,
        },
    })
    return (
        <View style={[styles.screenWrapper, props.style]}>
            {props.children}
        </View>
    )
}

export const ScreenHeader = ({style, title, navigation, reverse, contentStyle, ...props}) => {
    const reverseContentStyle = {alignItems: 'flex-end'};
    let _contentStyle = [
        reverse ? reverseContentStyle : null,
        contentStyle
    ];
    return (
        <CustomContentScreenHeader style={style} navigation={navigation} reverse={reverse}>
            <Appbar.Content color={useTheme().colors.primary} title={title} style={_contentStyle}/>
        </CustomContentScreenHeader>
    );
}

export const CustomContentCustomActionScreenHeader = (props) => {
    const theme = useTheme();
    return (
        <Appbar.Header
            style={{
                paddingVertical: 40,
                paddingHorizontal: 10,
                borderBottomWidth: 0,
                ...props.style,
            }}
            theme={theme.mostlyWhiteTheme}
        >
            {
                props.reverse ? [
                        <Appbar.Action key={'action-button'} icon={props.iconName} size={28} onPress={props.onActionPress} color={theme.colors.placeholder}/>,
                        <React.Fragment key={'header-children'}>
                            {props.children}
                        </React.Fragment>
                    ] :
                    [
                        <React.Fragment key={'header-children'}>
                            {props.children}
                        </React.Fragment>,
                        <Appbar.Action key={'action-button'} icon={props.iconName} size={28} onPress={props.onActionPress} color={theme.colors.placeholder}/>,
                    ]
            }
        </Appbar.Header>
    );
}

export const CustomContentScreenHeader = (props) => {
    let navigation = null;
    if (hasValue(props.navigation))
        navigation = props.navigation;
    else navigation = useNavigation();

    let goBackAction = hasValue(props.onBack) ? () => {props.onBack(navigation)} : () => {navigation.goBack()};
    const theme = useTheme();
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
            theme={theme.mostlyWhiteTheme}
        >
            {
                props.reverse ? [
                        <Appbar.Action key={'back-button'} icon="arrow-right" size={28} onPress={goBackAction} color={theme.colors.placeholder}/>,
                        <React.Fragment key={'header-children'}>
                            {props.children}
                        </React.Fragment>
                ] :
                [
                    <React.Fragment key={'header-children'}>
                        {props.children}
                    </React.Fragment>,
                    <Appbar.Action key={'back-button'} icon="arrow-left" size={28} onPress={goBackAction} color={theme.colors.placeholder}/>
                ]
            }
        </Appbar.Header>
    );
}

export const TitleOnlyScreenHeader = (props) => {
    const theme = useTheme();
    return (
        <Appbar.Header
            style={{
                paddingVertical: 40,
                paddingHorizontal: 10,
                borderBottomWidth: 0,
                ...props.style,
            }}
            theme={theme.mostlyWhiteTheme}
        >
            <Appbar.Content color={theme.colors.primary} title={props.title} style={props.contentStyle}/>
        </Appbar.Header>
    );
}

export const DoubleIconScreenHeader = (props) => {
    const theme = useTheme();
    return (
        <Appbar.Header
            style={{
                paddingVertical: 40,
                paddingHorizontal: 10,
                borderBottomWidth: 0,
                ...props.style,
            }}
            theme={theme.mostlyWhiteTheme}
        >
            <Appbar.Content color={theme.colors.primary} title={props.title} style={props.contentStyle}/>
            <Appbar.Action icon={props.right} size={28} onPress={firstNonEmpty(props.onRightPress, noop)} color={theme.colors.placeholder}/>
            <Appbar.Action icon={props.left} size={28} onPress={firstNonEmpty(props.onLeftPress, noop)} color={theme.colors.placeholder}/>
        </Appbar.Header>
    )
}

export const EmptyHeader = (props) => {
    const theme = useTheme();
    return (
        <Appbar.Header
            style={{
                paddingVertical: 40,
                paddingHorizontal: 10,
                borderBottomWidth: 0,
                elevation: 0,
                ...props.style,
            }}
            theme={theme.mostlyWhiteTheme}
        >
            {props.children}
        </Appbar.Header>
    )
}

export const DefaultMaterialIcon = (props) => {
    const theme = useTheme();
    return (
        <Appbar.Action
            icon={props.iconName} size={28} onPress={props.onPress}
            color={firstNonEmpty(props.color, theme.colors.placeholder)}
        />
    )
}