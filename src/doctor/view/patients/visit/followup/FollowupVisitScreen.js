import React from "react";
import {StyleSheet, View, I18nManager} from "react-native";
import {
    Text,
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
    CustomContentCustomActionScreenHeader,
    ScreenLayout
} from "../../../../../root/view/screen/Layout";
import {doctorDao} from "../../../../data/dao/DoctorDao";
import {stages} from "./FollowupVisitMetadata";
import {firstNonEmpty} from "../../../../../root/domain/util/Util";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {firstVisitDao} from "../../../../data/dao/FirstVisitDao";
import {ConditionalRender} from "../first/forms/Layout";
import {LoadingScreen} from "../../../../../root/view/loading/Loading";
import {FollowupVisit} from "../../../../domain/visit/FollowupVisit";
import FollowupVisitStageNavigator from "./FollowupVisitStageNavigator";
import {doctorVisitDao} from "../../../../data/dao/DoctorVisitDao";

class FollowupVisitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStage: 0,
            loaded: false,
            finishVisitDialogOpen: false,
            savingVisitInfo: false,
        }
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

    render() {
        const theme = this.props.theme;
        return (
            <LoadingScreen loaded={this.state.loaded}>
                <ScreenLayout>
                    <CustomContentCustomActionScreenHeader
                        iconName={this.props.route.params.readonly ? "arrow-right" : "check-bold"}
                        style={{elevation: 0}}
                        onActionPress={() => this.props.route.params.readonly ? this.onExit() : this.setState({finishVisitDialogOpen: true})}
                        reverse
                    >
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <View style={{width: '50%', }}>
                                <StageProgressBar currentStage={this.state.currentStage}/>
                            </View>
                        </View>
                    </CustomContentCustomActionScreenHeader>
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
