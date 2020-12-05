import 'react-native-gesture-handler';
import React from 'react';
import Navigator from "./src/root/view/Navigator";
import * as Font from "expo-font";
import AppLoading from "expo/build/launch/AppLoading";
import {Portal, Provider as PaperProvider} from 'react-native-paper';
import {Locale} from "./src/root/domain/Locale";
import {I18nManager} from "react-native";
import {rootDao} from "./src/root/data/dao/RootDao";
import {currentTheme} from "./theme";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        if(I18nManager.isRTL != true){
            I18nManager.forceRTL(true);
            RNRestart.Restart();
        }
    }

    componentDidMount() {
        const locale = rootDao.getLocale();
        if (locale == Locale.FA) I18nManager.forceRTL(true);
        else I18nManager.forceRTL(true);
        this.loadFontsAsync();
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

