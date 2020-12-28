import React from "react";
import {ScreenLayout} from "../screen/Layout";
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
import {useTheme} from "react-native-paper";

export const LoadingScreen = (props) => {
    const theme = useTheme();
    if (props.loaded == false) {
        return (
            <ScreenLayout style={{backgroundColor: theme.colors.background}}>
                <LoadingIndicator/>
            </ScreenLayout>
        )
    }
    else return props.children;
}

export const LoadingIndicator = (props) => {
    const theme = useTheme();
    return (
        <DotIndicator color={theme.colors.primary} />
    );
}