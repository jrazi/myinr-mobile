import 'react-native-gesture-handler';
import React from 'react';
import Navigator from "./src/root/view/Navigator";
import * as Font from "expo-font";
import AppLoading from "expo/build/launch/AppLoading";
import {DefaultTheme, Portal, Provider as PaperProvider} from 'react-native-paper';
import {Locale} from "./src/root/domain/Locale";
import {I18nManager} from "react-native";
import {rootDao} from "./src/root/data/dao/RootDao";

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        // primary: '#fff',
        // accent: '#fff',
        background: '#fff',
        surface: '#fff',
    },
};

export const currentTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#03045e',
        accent: '#0077b6',
        background: '#fff',
        surface: '#fff',
    },
}

export const mostlyWhiteTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#fff',
        accent: '#fff',
        background: '#fff',
        surface: '#fff',
    },
};

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
    }

    componentDidMount() {
        this.loadFontsAsync();
        const locale = rootDao.getLocale();
        if (locale == Locale.FA) I18nManager.forceRTL(true);
        else I18nManager.forceRTL(true);
    }

    loadFontsAsync = async () => {
        Font.loadAsync({
            Yekan: require("./assets/fonts/Yekan.ttf")
        }).then(() => {
            this.setState({ loaded: true });
        })
    };

    render() {
        if (!this.state.loaded) return <AppLoading/>
        else return (
            <PaperProvider theme={currentTheme}>
                <Portal.Host>
                    <Navigator/>
                </Portal.Host>
            </PaperProvider>
        );
    }
}

