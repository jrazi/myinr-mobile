import 'react-native-gesture-handler';
import React, {useReducer} from 'react';
import Navigator from "./src/root/view/Navigator";
import * as Font from "expo-font";
import {Portal, Provider as PaperProvider} from 'react-native-paper';
import {I18nManager} from "react-native";
import {rootDao} from "./src/root/data/dao/RootDao";
import {lightTheme, darkTheme} from "./theme";
import RNRestart from 'react-native-restart';
import {LoadingScreen} from "./src/root/view/loading/Loading";
import {ThemeContext} from "./src/root/view/RootContextProvider";
import FlashMessage from "react-native-flash-message";


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            theme: darkTheme,
        }
    }

    componentDidMount() {
        this.setState({ loaded: false}, () => {
            rootDao.getDarkMode()
                .then(darkMode => {
                    this.setState({ theme: darkMode ? darkTheme : lightTheme });
                })
            if(I18nManager.isRTL != true){
                I18nManager.forceRTL(true);
                RNRestart.Restart();
            }
            this.loadFontsAsync()
                .then(() => {
                    this.setState({ loaded: true});
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

    changeTheme = (theme) => {
        this.setState({theme: theme});
    }

    render() {
        return (
            <LoadingScreen loaded={this.state.loaded}>
                <PaperProvider theme={this.state.theme} >
                    <ThemeContext.Provider value={{changeTheme: (theme) => this.changeTheme(theme)}}>
                        <Portal.Host >
                            <Navigator/>
                            <FlashMessage
                                position="top"
                                textStyle={{
                                    fontFamily: 'IranSans',
                                }}
                                titleStyle={{
                                    fontFamily: 'IranSans',
                                }}
                            />
                        </Portal.Host>
                    </ThemeContext.Provider>
                </PaperProvider>
            </LoadingScreen>
        );
    }
}

