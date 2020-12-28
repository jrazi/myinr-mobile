import 'react-native-gesture-handler';
import React, {useReducer} from 'react';
import Navigator from "./src/root/view/Navigator";
import * as Font from "expo-font";
import AppLoading from "expo/build/launch/AppLoading";
import {Portal, Provider as PaperProvider} from 'react-native-paper';
import {Locale} from "./src/root/domain/Locale";
import {I18nManager} from "react-native";
import {rootDao} from "./src/root/data/dao/RootDao";
import {changeTheme, changeToDarkTheme, changeToLightTheme, currentTheme} from "./theme";
import RNRestart from 'react-native-restart';
import {LoadingScreen} from "./src/root/view/loading/Loading";

import { useState, useCallback } from 'react'

export var useChangeTheme = (darkMode) => {};

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            theme: currentTheme,
        }
        if(I18nManager.isRTL != true){
            I18nManager.forceRTL(true);
            RNRestart.Restart();
        }
    }

    updateTheme = (darkMode) => {
        changeTheme(darkMode);
        this.setState({theme: currentTheme});
    }

    componentDidMount() {
        useChangeTheme = (darkMode) => this.updateTheme(darkMode);
        this.setState({ loaded: false}, () => {
            if(I18nManager.isRTL != true){
                I18nManager.forceRTL(true);
                RNRestart.Restart();
            }
            this.loadFontsAsync()
                .then(() => {
                    rootDao.getDarkMode()
                        .then(darkMode => {
                            if (darkMode) changeToDarkTheme();
                            else changeToLightTheme();
                            this.setState({ loaded: true, theme: currentTheme });
                        })
                })
        });
    }

    loadFontsAsync = async () => {
        return Font.loadAsync({
            IranSans: require("./assets/fonts/IRANSansMobile.ttf"),
            IranSansBlack: require("./assets/fonts/IRANSansMobile_Black.ttf"),
            IranSansBold: require("./assets/fonts/IRANSansMobile_Bold.ttf"),
            IranSansMedium: require("./assets/fonts/IRANSansMobile_Medium.ttf"),
            IranSansLight: require("./assets/fonts/IRANSansMobile_Light.ttf"),
            IranSansUltraLight: require("./assets/fonts/IRANSansMobile_UltraLight.ttf"),
        });
    };

    render() {
        return (
            <LoadingScreen loaded={this.state.loaded}>
                <PaperProvider theme={this.state.theme}>
                    <Portal.Host>
                        <Navigator/>
                    </Portal.Host>
                </PaperProvider>
            </LoadingScreen>
        );
    }
}

