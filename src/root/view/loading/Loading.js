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
import {currentTheme} from "../../../../theme";

export const LoadingScreen = (props) => {
    if (props.loaded == false) {
        return (
            <ScreenLayout>
                <LoadingIndicator/>
            </ScreenLayout>
        )
    }
    else return props.children;
}

export const LoadingIndicator = (props) => {
    return (
        <DotIndicator color={currentTheme.colors.primary} />
    );
}