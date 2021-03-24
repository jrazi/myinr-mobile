import React from "react";
import {ScreenHeader, ScreenLayout} from "../../root/view/screen/Layout";
import * as Layout from "./patients/visit/first/forms/Layout";
import {DefaultSwitchRow} from "./patients/visit/first/forms/ContextSpecificComponents";
import {View} from 'react-native';
import {rootDao} from "../../root/data/dao/RootDao";
import {ConditionalCollapsibleRender, ConditionalRender} from "./patients/visit/first/forms/Layout";
import {withTheme} from "react-native-paper";
import {darkTheme, lightTheme} from "../../../theme";
import {ThemeContext} from "../../root/view/RootContextProvider";


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

    toggleDarkMode = (changeThemeCallback) => {
        this.setState({darkModeOn: !this.state.darkModeOn}, async () => {
            await rootDao.setDarkMode(this.state.darkModeOn);
            changeThemeCallback(this.state.darkModeOn ? darkTheme : lightTheme);
            // NativeDevSettings.reload();
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
                    <ThemeContext.Consumer>
                        {(value) => {
                            return (
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
                                        onFlip={() => {this.toggleDarkMode(value.changeTheme)}}
                                    />
                                </ConditionalRender>
                            )
                        }}
                    </ThemeContext.Consumer>
                </View>
            </ScreenLayout>
        )
    }
}

export default withTheme(SettingsScreen);

