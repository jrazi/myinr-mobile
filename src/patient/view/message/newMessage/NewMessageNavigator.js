import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import StartingStage from "./stages/StartingStage";
import DosageChangeReport from "./stages/DosageChangeReport";
import {LoadingScreen} from "../../../../root/view/loading/Loading";
import {ScreenHeader, ScreenLayout} from "../../../../root/view/screen/Layout";
import {Button, Surface, useTheme, withTheme} from "react-native-paper";
import {View} from "react-native";
import MessageText from "./stages/MessageText";
import InrReport from "./stages/InrReport";
import {hasValue} from "../../../../root/domain/util/Util";
import color from "color";
import {StageActivationContext} from "./MessageContext";


export const STAGES = {
    STARTING: {
        id: 'STARTING',
        stackRoute: 'NewMessageStartingStage',
        order: 0,
        next: 'MESSAGE',
        prev: null,
    },
    INR_INFO: {
        id: 'INR_INFO',
        stackRoute: 'NewMessageInrInfo',
        order: 2,
        next: 'DOSAGE_REPORT',
        prev: 'MESSAGE',
    },
    MESSAGE: {
        id: 'MESSAGE',
        stackRoute: 'NewMessageTextMessage',
        order: 1,
        next: 'INR_INFO',
        prev: 'STARTING',
    },
    DOSAGE_REPORT: {
        id: 'DOSAGE_REPORT',
        stackRoute: 'NewMessageDosageChangeReport',
        order: 3,
        next: null,
        prev: 'INR_INFO',
    },
}

class NewMessageNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            stageEnableStatus: {
                STARTING: true,
                INR_INFO: false,
                MESSAGE: true,
                DOSAGE_REPORT: false,
            },
            currentStage: 'STARTING',
        }
    }

    componentDidMount() {
        this.navigateToStage(this.state.currentStage);
    }

    onSendMessageRequest = () => {

    }

    sendMessage = () => {

    }

    goToNextStage = (currentStageId=null) => {
        let stage = currentStageId ? STAGES[currentStageId] : STAGES[this.state.currentStage];
        if (!stage.next) {
            this.onSendMessageRequest();
            return;
        }

        else if (!this.isStageEnabled(stage.next))
            this.goToNextStage(stage.next);

        else this.navigateToStage(stage.next);
    }

    goToPrevStage = (currentStageId=null) => {
        let stage = currentStageId ? STAGES[currentStageId] : STAGES[this.state.currentStage];
        if (!stage.prev) return;
        else if (!this.isStageEnabled(stage.prev))
            this.goToPrevStage(stage.prev);

        else this.navigateToStage(stage.prev);
    }

    navigateToStage(stageId) {
        this.setState({
            currentStage: stageId,
        }, () => {
            this.props.navigation.navigate(STAGES[stageId].stackRoute);
        })
    }

    isStageEnabled(stageId) {
        return this.state.stageEnableStatus[stageId];
    }

    getStageObject() {
        return STAGES[this.state.currentStage];
    }

    getEnabledNext(current=null) {
        const stage = current ? STAGES[current] : this.getStageObject();
        if (!hasValue(stage.next))
            return null;

        else if (!this.isStageEnabled(stage.next))
            this.getEnabledNext(stage.next);

        else return stage.next;
    }

    changeStageEnableStatus = (stageId, newStatus) => {
        this.state.stageEnableStatus[stageId] = newStatus || false;
        this.setState({stageEnableStatus: this.state.stageEnableStatus});
    }

    render() {
        return (
            <LoadingScreen loaded={this.state.loaded}>
                <StageActivationContext.Provider value={{stageEnableStatus: this.state.stageEnableStatus, changeEnableStatus: this.changeStageEnableStatus}}>
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
                                onNext={() => this.goToNextStage()}
                                onPrevious={() => this.goToPrevStage()}
                                prevEnabled={hasValue(this.getStageObject().prev)}
                                nextIsFinish={!hasValue(this.getEnabledNext())}
                            />
                        </View>
                    </ScreenLayout>
                </StageActivationContext.Provider>
            </LoadingScreen>
        );
    }
}

export default withTheme(NewMessageNavigator);

const BottomActionBox = (props) => {
    const theme = useTheme();

    const prevButtonColor = null;
    return (
        <Surface
            style={{
                elevation: 0,
            }}
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
                    onPress={props.onPrevious}
                    disabled={!props.prevEnabled}
                    color={prevButtonColor}
                />
                <ActionButton
                    title={props.nextIsFinish ? 'ارسال' : 'بعدی'}
                    onPress={props.onNext}
                    color={props.nextIsFinish ? theme.colors.actionColors.secondary : null}
                />
            </View>
        </Surface>
    )
}

const ActionButton = (props) => {
    const theme = useTheme();

    return (
        <Button
            color={props.color || theme.colors.actionColors.primary}
            mode="contained"
            onPress={props.onPress}
            labelStyle={{fontSize: 14}}
            style={{
                marginHorizontal: 30,
            }}
            disabled={props.disabled}
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
            name={STAGES.MESSAGE.stackRoute}
            component={MessageText}
            options={{ headerShown: false , headerTitle: props => null }}
        />
        <Stack.Screen
            name={STAGES.INR_INFO.stackRoute}
            component={InrReport}
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

