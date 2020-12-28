import React from "react";
import {ScreenHeader, ScreenLayout} from "../../root/view/screen/Layout";
import * as Layout from "./patients/visit/first/forms/Layout";
import {DefaultSwitchRow} from "./patients/visit/first/forms/ContextSpecificComponents";
import {View} from 'react-native';
import {currentTheme} from "../../../theme";
import {rootDao} from "../../root/data/dao/RootDao";
import {ConditionalCollapsibleRender} from "./patients/visit/first/forms/Layout";

export class SettingsScreen extends React.Component {
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
        this.setState({darkModeOn: !this.state.darkModeOn}, () => {
            rootDao.setDarkMode(this.state.darkModeOn);
        });
    }

    render() {
        return (
            <ScreenLayout>
                <ScreenHeader
                    title={'تنظیمات'} style={{elevation: 0}}
                />
                <View style={{paddingHorizontal: 20,}}>
                    <ConditionalCollapsibleRender hidden={!this.state.loaded}>
                        <Layout.IntraSectionInvisibleDivider s/>
                        <DefaultSwitchRow
                            rowStyle={{
                                flexDirection: 'row',
                            }}
                            titleStyle={{
                                color: currentTheme.colors.text,
                            }}
                            title={'حالت تاریک'}
                            value={this.state.darkModeOn}
                            onFlip={this.toggleDarkMode}
                        />
                    </ConditionalCollapsibleRender>
                </View>
            </ScreenLayout>
        )
    }
}

