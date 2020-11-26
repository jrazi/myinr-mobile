import 'react-native-gesture-handler';
import React from 'react';
import Navigator from "./src/root/view/Navigator";
import * as Font from "expo-font";
import AppLoading from "expo/build/launch/AppLoading";
import { Provider as PaperProvider } from 'react-native-paper';


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
            <PaperProvider>
                <Navigator/>
            </PaperProvider>
        );
    }
}

