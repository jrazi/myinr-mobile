import React from "react";
import {LoadingScreen} from "../../../../../root/view/loading/Loading";
import {ScreenHeader, ScreenLayout} from "../../../../../root/view/screen/Layout";
import {Button, Surface, Text, useTheme, withTheme} from "react-native-paper";
import {View} from "react-native";
import {ConditionalRender} from "../../../../../doctor/view/patients/visit/first/forms/Layout";


class StartingStage extends React.Component {
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
                        <Text>{'Starting Stage'}</Text>
                    </View>
                    <View>
                        <Button
                            color={this.props.theme.colors.actionColors.primary}
                            compact mode="contained"
                            onPress={() => this.props.navigation.navigate('NewMessageDosageChangeReport')}
                            labelStyle={{fontSize: 12}}
                        >
                            Navigate
                        </Button>
                    </View>
                </ScreenLayout>
            </LoadingScreen>
        );
    }
}

export default withTheme(StartingStage);


const ControlHeader = (props) => {
    const theme = useTheme();

    return (
        <Surface style={{elevation: 4}}>
            <ScreenHeader
                title="پیام به پزشک"
                style={{elevation: 0}}
            />
        </Surface>
    )
}
