import React from "react";
import {StyleSheet, View, I18nManager} from "react-native";
import  {
    Text,
    Divider,
    Menu,
    ProgressBar,
    Badge,
    Appbar,
    Avatar,
    FAB,
    Portal,
    Dialog,
    Button,
    Subheading,
    withTheme, useTheme
} from "react-native-paper";
import {
    CustomContentCustomActionScreenHeader, MORE_ICON, ScreenHeaderWithProvidedActions,
    ScreenLayout
} from "../../../../../root/view/screen/Layout";
import {stages} from "./FollowupVisitMetadata";
import {firstNonEmpty} from "../../../../../root/domain/util/Util";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {ConditionalRender} from "../first/forms/Layout";
import {LoadingScreen} from "../../../../../root/view/loading/Loading";
import FollowupVisitStageNavigator from "./FollowupVisitStageNavigator";
import {doctorVisitDao} from "../../../../data/dao/DoctorVisitDao";

class FollowupVisitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStage: 0,
            loaded: false,
            finishVisitDialogOpen: false,
            cancelVisitDialogOpen: false,
            savingVisitInfo: false,
        }
    }

    openCancelVisitDialog = () => {
        this.setState({
            finishVisitDialogOpen: false,
            cancelVisitDialogOpen: true,
        });
    }

    async componentDidMount() {
        // await I18nManager.forceRTL(false);
        this.setState({
            loaded: true
        })
    }


    onNewStage = (stageIndex) => {
        this.setState({currentStage: stageIndex}, () => {
        });
    }

    onExit = () => {
        this.props.navigation.goBack();
    }

    onFinish = () => {
        this.setState({savingVisitInfo: true}, () => {
            this.saveVisit()
                .finally(() => {
                    this.setState({savingVisitInfo: false, finishVisitDialogOpen: false}, () => {
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{name: 'DoctorApp'}, {name: 'PatientProfileScreen', params: {userId: this.props.route.params.userId}}],
                        })
                    });
                })

        })
    }

    saveVisit = async () => {
        const userId = this.props.route.params.userId;
        const appointmentId = this.props.route.params.appointmentId;

        if (this.props.route.params.readonly) return;

        await doctorVisitDao.saveFollowupVisit(userId, appointmentId, this.props.route.params.visitInfo)
    }

    getScreenHeader() {
        const theme = this.props.theme;
        return this.props.route.params.readonly ?
            (_props) => (
                <CustomContentCustomActionScreenHeader
                    iconName={"arrow-right"}
                    style={{elevation: 0}}
                    onActionPress={this.onExit}
                    reverse
                >
                    {_props.children}
                </CustomContentCustomActionScreenHeader>
            )
            : (_props) => (
                <ScreenHeaderWithProvidedActions
                    actionItems = {[
                        <Appbar.Action key={'MORE_ACTION'} icon={'arrow-right'} size={28} onPress={this.openCancelVisitDialog} color={theme.colors.placeholder}/>,
                        <Appbar.Action key={'SAVE_ACTION'} icon={'check-bold'} size={28} onPress={() => this.setState({finishVisitDialogOpen: true})} color={theme.colors.placeholder}/>,
                    ]}
                    style={{
                        elevation: 0,
                    }}
                    reverse
                >
                    {_props.children}
                </ScreenHeaderWithProvidedActions>
            );
    }

    render() {
        const theme = this.props.theme;
        const ScreenHeaderElement = this.getScreenHeader();

        return (
            <LoadingScreen loaded={this.state.loaded}>
                <ScreenLayout>
                    <ScreenHeaderElement
                    >
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <View style={{width: '50%', }}>
                                <StageProgressBar currentStage={this.state.currentStage}/>
                            </View>
                        </View>
                    </ScreenHeaderElement>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: theme.colors.surface,
                        }}
                    >
                        <ConditionalRender hidden={!this.state.loaded}>
                            <FollowupVisitStageNavigator
                                navigation={this.props.navigation}
                                route={this.props.route}
                                visitInfo={this.props.route.params.visitInfo}
                                userId={this.props.route.params.userId}
                                onNewStage={this.onNewStage}
                                currentStage={this.state.currentStage}
                            />
                        </ConditionalRender>
                    </View>
                    <FinishVisitDialog
                        visible={this.state.finishVisitDialogOpen}
                        loading={this.state.savingVisitInfo}
                        onDismiss={() => this.setState({finishVisitDialogOpen: false})}
                        onFinish={this.onFinish}
                    />
                    <CancelVisitDialog
                        visible={this.state.cancelVisitDialogOpen}
                        loading={false}
                        onDismiss={() => this.setState({cancelVisitDialogOpen: false})}
                        onCancel={this.onExit}
                    />
                </ScreenLayout>
            </LoadingScreen>
        )
    }
}

export default withTheme(FollowupVisitScreen);

const StageProgressBar = (props) => {
    const theme = useTheme();
    let progressDots = [];
    for (let i = 0; i < firstNonEmpty(stages.length, 0); i++) {
        progressDots.push(
            <MaterialIcons
                style={{
                    marginHorizontal: 3,
                    opacity: props.currentStage == i ? 1.0 : 0.3,
                }}
                size={16}
                name={"circle"}
                color={props.currentStage == i ? theme.colors.primary : theme.colors.placeholder}
                key={i}
            />
        )
    }

    return (
        <View
            style={{
                flexDirection: 'row-reverse',
                // ...debugBorderRed,
                alignItems: 'center',
            }}
        >
            {progressDots}
        </View>
    )
}


const CancelVisitDialog = (props) => {
    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onDismiss} style={{paddingBottom: 5}} dismissable={false}>
                <DialogMessage>آیا میخواهید ویزیت را لغو کنید؟</DialogMessage>
                <Dialog.Actions style={{alignItems: 'center', justifyContent: 'space-around',}}>
                    <Button style={{}} labelStyle={{padding: 5}} mode="text" loading={props.loading} onPress={props.onCancel} >لغو ویزیت</Button>
                    <Button disabled={false} style={{}} labelStyle={{padding: 5}} mode="text" onPress={props.onDismiss} >بازگشت</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}
const FinishVisitDialog = (props) => {
    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onDismiss} style={{paddingBottom: 5}} dismissable={false}>
                <DialogMessage>آیا میخواهید ویزیت را به اتمام برسانید؟</DialogMessage>
                <Dialog.Actions style={{alignItems: 'center', justifyContent: 'space-around',}}>
                    <Button style={{}} labelStyle={{padding: 5}} mode="text" loading={props.loading} onPress={props.onFinish} >اتمام ویزیت</Button>
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
