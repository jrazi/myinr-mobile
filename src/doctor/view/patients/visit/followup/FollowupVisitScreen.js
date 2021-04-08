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

class FollowupVisitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStage: 0,
            loaded: false,
            visitInfo: {},
        }
    }

    async componentDidMount() {
        // await I18nManager.forceRTL(false);
        this.setState({
            visitInfo: this.props.route.params.visitInfo || FollowupVisit.createNew(),
            loaded: true
        })
    }


    onNewStage = (stageIndex) => {
        this.setState({currentStage: stageIndex}, () => {
        });
    }

    onExit = () => {
        this.saveVisit()
            .finally(() => {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{name: 'DoctorApp'}, {name: 'PatientProfileScreen', params: {userId: this.props.route.params.userId}}],
                })
            })
    }

    saveVisit = async () => {
        const userId = this.props.route.params.userId;
        if (this.props.route.params.readonly) return;
        let visit = firstVisitDao.getVisits(userId);
        const info = {
            currentStage: this.state.currentStage,
            visitInfo: visit,
        }
        await doctorDao.updateFirstVisit(userId, info, true);
    }

    render() {
        const theme = this.props.theme;
        return (
            <LoadingScreen loaded={this.state.loaded}>
                <ScreenLayout>
                    <CustomContentCustomActionScreenHeader
                        iconName={"check-bold"}
                        style={{elevation: 0}}
                        onActionPress={this.onExit}
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
                                visitInfo={this.state.visitInfo}
                                userId={this.props.route.params.userId}
                                onNewStage={this.onNewStage}
                                currentStage={this.state.currentStage}
                            />
                        </ConditionalRender>
                    </View>
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
                <DialogMessage>آیا مطمئن هستید؟</DialogMessage>
                <Dialog.Actions style={{alignItems: 'center', justifyContent: 'space-around',}}>
                    <Button style={{}} labelStyle={{padding: 5}} mode="text" loading={props.loading} onPress={props.onFinish} >اتمام ویزیت</Button>
                    <Button disabled={false} style={{}} labelStyle={{padding: 5}} mode="text" onPress={props.onDismiss} >انصرف</Button>
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
