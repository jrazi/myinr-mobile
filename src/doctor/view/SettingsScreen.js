import React from "react";
import {ScreenHeader, ScreenLayout} from "../../root/view/screen/Layout";
import * as Layout from "./patients/visit/first/forms/Layout";
import {DefaultSwitchRow} from "./patients/visit/first/forms/ContextSpecificComponents";
import {View} from 'react-native';
import {rootDao} from "../../root/data/dao/RootDao";
import {ConditionalCollapsibleRender, ConditionalRender} from "./patients/visit/first/forms/Layout";
import RNRestart from "react-native-restart";
import Updates from "expo-updates";
import NativeDevSettings from "react-native/Libraries/NativeModules/specs/NativeDevSettings";
import {withTheme} from "react-native-paper";


class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            darkModeOn: false,
            loaded: false,
        }
    }

    componentDidMount() {
        rootDao.getDarkMode()
            .then(darkMode => this.setState({darkModeOn: darkMode, loaded: true}));
    }

    toggleDarkMode = () => {
        this.setState({darkModeOn: !this.state.darkModeOn}, async () => {
            await rootDao.setDarkMode(this.state.darkModeOn);
            NativeDevSettings.reload();
        });
    }

    render() {
        const theme = this.props.theme;
        return (
            <ScreenLayout>
                <ScreenHeader
                    title={'تنظیمات'} style={{elevation: 0}}
                />
                <View style={{paddingHorizontal: 20,}}>
                    <ConditionalRender hidden={!this.state.loaded}>
                        <Layout.IntraSectionInvisibleDivider s/>
                        <DefaultSwitchRow
                            rowStyle={{
                                flexDirection: 'row',
                            }}
                            titleStyle={{
                                color: theme.colors.text,
                            }}
                            title={'حالت تاریک'}
                            value={this.state.darkModeOn}
                            onFlip={this.toggleDarkMode}
                        />
                    </ConditionalRender>
                </View>
            </ScreenLayout>
        )
    }
}

export default withTheme(SettingsScreen);

