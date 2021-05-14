import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import StartingStage from "./stages/StartingStage";
import DosageChangeReport from "./stages/DosageChangeReport";
import {LoadingScreen} from "../../../../root/view/loading/Loading";
import {ScreenHeader, ScreenLayout} from "../../../../root/view/screen/Layout";
import {Button, Surface, useTheme, withTheme} from "react-native-paper";
import {View} from "react-native";


const STAGES = {
    STARTING: {
        stackRoute: 'NewMessageStartingStage',
        order: 0,
    },
    DOSAGE_REPORT: {
        stackRoute: 'NewMessageDosageChangeReport',
        order: 3,
    },
}

class NewMessageNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <LoadingScreen loaded={this.state.loaded}>
                <ScreenLayout>
                    <ControlHeader
                    />
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <NewMessageStageNavigator/>
                        <BottomActionBox
                            navigation={this.props.navigation}
                        />
                    </View>
                </ScreenLayout>
            </LoadingScreen>
        );
    }
}

export default withTheme(NewMessageNavigator);

const BottomActionBox = (props) => {
    const theme = useTheme();

    return (
        <Surface
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingVertical: 10,
                }}
            >
                <ActionButton
                    title={'قبلی'}
                    onPress={() => props.navigation.navigate('NewMessageDosageChangeReport')}
                />
                <ActionButton
                    title={'بعدی'}
                    onPress={() => props.navigation.navigate('NewMessageDosageChangeReport')}
                />
            </View>
        </Surface>
    )
}

const ActionButton = (props) => {
    const theme = useTheme();

    return (
        <Button
            color={theme.colors.actionColors.primary}
            mode="contained"
            onPress={props.onPress}
            labelStyle={{fontSize: 14}}
            style={{
                marginHorizontal: 30,
            }}
        >
            {props.title}
        </Button>
    )
}


const Stack = createStackNavigator();

const NewMessageStageNavigator = (props) => (
    <Stack.Navigator
        initialRoute={STAGES.STARTING.stackRoute}
    >
        <Stack.Screen
            name={STAGES.STARTING.stackRoute}
            component={StartingStage}
            options={{ headerShown: false , headerTitle: props => null }}
        />
        <Stack.Screen
            name={STAGES.DOSAGE_REPORT.stackRoute}
            component={DosageChangeReport}
            options={{ headerShown: false , headerTitle: props => null }}
        />
    </Stack.Navigator>
)

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

