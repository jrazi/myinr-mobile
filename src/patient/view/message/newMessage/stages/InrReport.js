import React from "react";
import {LoadingScreen} from "../../../../../root/view/loading/Loading";
import {ScreenHeader, ScreenLayout} from "../../../../../root/view/screen/Layout";
import {Surface, Text, useTheme, withTheme} from "react-native-paper";
import {View} from "react-native";

class InrReport extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loaded: true,
        }
    }

    componentDidMount = async () => {
    }


    render() {
        return (
            <LoadingScreen loaded={this.state.loaded}>
                <ScreenLayout>
                    <View>
                        <Text>{'Inr Report'}</Text>
                    </View>
                </ScreenLayout>
            </LoadingScreen>
        );
    }
}

export default withTheme(InrReport);
