import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import StartingStage from "./stages/StartingStage";
import DosageChangeReport from "./stages/DosageChangeReport";
import {LoadingScreen} from "../../../../root/view/loading/Loading";
import {ScreenHeader, ScreenLayout} from "../../../../root/view/screen/Layout";
import {Button, Dialog, Portal, Subheading, Surface, useTheme, withTheme} from "react-native-paper";
import {View} from "react-native";
import MessageText from "./stages/MessageText";
import InrReport from "./stages/InrReport";
import {hasValue, sleep} from "../../../../root/domain/util/Util";
import {PatientMessageContext, StageActivationContext} from "./MessageContext";
import {PatientMessage} from "../../../../root/domain/PatientMessage";
import {patientDao} from "../../../data/dao/PatientDao";
import {showMessage} from "react-native-flash-message";
import {STAGES} from "./StageMetadata";
import {assignDatesToDosageRecords} from "../../util";


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
            isSendDoubleCheckOpen: false,
            isSendingMessage: false,
        }
        this.patientMessage = PatientMessage.createNew();
    }

    componentDidMount() {
        // if (hasValue(this.props.route.params.patientInfo)) {
        //     let lastWarfarinDosage = this.props.route.params.patientInfo.latestWarfarinDosage || this.patientMessage.lastWarfarinDosage;
        //     lastWarfarinDosage = assignDatesToDosageRecords(lastWarfarinDosage);
        //     this.patientMessage.lastWarfarinDosage = lastWarfarinDosage;
        // }
        this.navigateToStage(this.state.currentStage);
    }

    onSendMessageRequest = () => {
        this.setState({isSendDoubleCheckOpen: true})
    }

    sendMessage = () => {
        this.setState({isSendingMessage: true}, () => {
            patientDao.sendMessageToPhysician(this.patientMessage)
                .then(async res => {
                    showMessage({
                        message: 'پیام ارسال شد',
                        description: null,
                        type: "success",
                    });
                    await sleep(0.5);

                    this.setState({
                        isSendDoubleCheckOpen: false,
                        isSendingMessage: false,
                    }, () => {
                        this.props.navigation.navigate(
                            'PatientApp'
                        );
                    })
                })
                .catch(err => {
                    this.setState({
                        isSendDoubleCheckOpen: false,
                        isSendingMessage: false,
                    }, () => {}
                    )
                })

        })
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
            return this.getEnabledNext(stage.next);

        else return stage.next;
    }

    changeStageEnableStatus = (stageId, newStatus) => {
        this.state.stageEnableStatus[stageId] = newStatus || false;
        this.setState({stageEnableStatus: this.state.stageEnableStatus});
    }

    render() {
        return (
            <LoadingScreen loaded={this.state.loaded}>
                <PatientMessageContext.Provider value={{patientMessage: this.patientMessage,}}>
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
                                    isSendingMessage={this.state.isSendingMessage}
                                />
                            </View>
                        </ScreenLayout>
                        <SendMessageDoubleCheckDialog
                            visible={this.state.isSendDoubleCheckOpen}
                            loading={this.state.isSendingMessage}
                            onDismiss={() => this.setState({isSendDoubleCheckOpen: false})}
                            onSend={this.sendMessage}
                        />
                </StageActivationContext.Provider>
                </PatientMessageContext.Provider>
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
                    disabled={!props.prevEnabled || props.isSendingMessage}
                    color={prevButtonColor}
                />
                <ActionButton
                    title={props.nextIsFinish ? 'ارسال' : 'بعدی'}
                    onPress={props.onNext}
                    disabled={props.isSendingMessage}
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

const SendMessageDoubleCheckDialog = (props) => {
    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onDismiss} style={{paddingBottom: 5}} dismissable={false}>
                <DialogMessage>آیا میخواهید پیام را ارسال کنید؟</DialogMessage>
                <Dialog.Actions style={{alignItems: 'center', justifyContent: 'space-around',}}>
                    <Button style={{}} labelStyle={{padding: 5}} mode="text" loading={props.loading} onPress={props.onSend} >ارسال پیام</Button>
                    <Button disabled={false} style={{}} labelStyle={{padding: 5}} mode="text" onPress={props.onDismiss} >بازگشت</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

const DialogMessage = (props) => {return (
    <Dialog.Content color={useTheme().colors.placeholder} style={{paddingTop: 20}}>
        <Subheading style={{textAlign: 'center'}}>{props.children}</Subheading>
    </Dialog.Content>
)}


