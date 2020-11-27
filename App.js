import 'react-native-gesture-handler';
import React from 'react';
import Navigator from "./src/root/view/Navigator";
import * as Font from "expo-font";
import AppLoading from "expo/build/launch/AppLoading";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
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
            <PaperProvider theme={theme}>
                <Navigator/>
            </PaperProvider>
        );
    }
}

