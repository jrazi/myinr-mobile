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
import RNRestart from 'react-native-restart';
import {LoadingScreen} from "./src/root/view/loading/Loading";

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
        this.setState({ loaded: false}, () => {
            if(I18nManager.isRTL != true){
                I18nManager.forceRTL(true);
                RNRestart.Restart();
            }
            this.loadFontsAsync();
        });
    }

    loadFontsAsync = async () => {
        Font.loadAsync({
            IranSans: require("./assets/fonts/IRANSansMobile.ttf"),
            IranSansBlack: require("./assets/fonts/IRANSansMobile_Black.ttf"),
            IranSansBold: require("./assets/fonts/IRANSansMobile_Bold.ttf"),
            IranSansMedium: require("./assets/fonts/IRANSansMobile_Medium.ttf"),
            IranSansLight: require("./assets/fonts/IRANSansMobile_Light.ttf"),
            IranSansUltraLight: require("./assets/fonts/IRANSansMobile_UltraLight.ttf"),
        }).then(() => {
            this.setState({ loaded: true });
        })
    };

    render() {
        return (
            <LoadingScreen loaded={this.state.loaded}>
                <PaperProvider theme={currentTheme}>
                    <Portal.Host>
                        <Navigator/>
                    </Portal.Host>
                </PaperProvider>
            </LoadingScreen>
        );
    }
}

