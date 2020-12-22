import React from "react";
import {StyleSheet, View, I18nManager} from "react-native";
import {Text, ProgressBar, Badge, Appbar, Avatar, FAB, Portal, Dialog, Button, Subheading} from "react-native-paper";
import {CustomContentScreenHeader, ScreenHeader, ScreenLayout} from "../../../../../root/view/screen/Layout";
import {FirstVisit} from "../../../../domain/visit/Visit";
import {doctorDao, VisitState} from "../../../../data/dao/DoctorDao";
import {currentTheme} from "../../../../../../theme";
import StageNavigator from "./StageNavigator";
import {stages} from "./FirstVisitProperties";
import {debugBorderRed} from "../../../../../root/view/styles/borders";
import {firstNonEmpty} from "../../../../../root/domain/util/Util";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {visitDao} from "../../../../data/dao/VisitDao";
import {ConditionalRender} from "./forms/Layout";
import {LoadingScreen} from "../../../../../root/view/loading/Loading";
// import RNRestart from 'react-native-restart';

export class FirstVisitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visitInfo: FirstVisit.createNew(),
            currentStage: 0,
            finishVisitDialogOpen: false,
            loaded: false,
        }
    }

    componentDidMount() {
        const {userId, useCache} = this.props.route.params;

        let visitInfo = visitDao.initVisit(userId);

        if (!useCache) {
            doctorDao.saveCachedVisit(userId, {currentStage: 0, visitInfo: visitInfo});
            this.setState({visitInfo: visitInfo, currentStage: 0, loaded: true});
            return ;
        }

        doctorDao.getCachedVisit(userId)
            .then(cachedVisit => {
                visitInfo = visitDao.setVisits(userId, cachedVisit.visitInfo);
                this.setState({visitInfo: visitInfo, currentStage: cachedVisit.currentStage, loaded: true});
            })
            .catch(err => {
                doctorDao.saveCachedVisit(userId, {currentStage: 0, visitInfo: visitInfo});
                this.setState({visitInfo: visitInfo, currentStage: 0, loaded: true});
            })
            .finally(() => {
            })
    }


    onNewStage = (stageIndex) => {
        this.setState({currentStage: stageIndex}, () => {
            const userId = this.props.route.params.userId;
            let visit = visitDao.getVisits(userId);
            const info = {
                currentStage: this.state.currentStage,
                visitInfo: visit,
            }
            doctorDao.saveCachedVisit(userId, info);
        });
    }

    finishVisit = () => {
        const info = {
            currentStage: this.state.currentStage,
            visitInfo: visitDao.getVisits(this.props.route.params.userId),
        }
        doctorDao.saveCachedVisit(this.props.route.params.userId, info);
        this.setState({finishVisitDialogOpen: false});
        this.props.navigation.reset({
            index: 0,
            routes: [{name: 'DoctorApp'}, {name: 'PatientProfileScreen', params: {userId: this.props.route.params.userId}}],
        });
    }

    render() {
        return (
            <LoadingScreen loaded={this.state.loaded}>
                <ScreenLayout>
                    <CustomContentScreenHeader
                        style={{elevation: 0}}
                        onBack={() =>
                            this.props.navigation.reset({
                                index: 0,
                                routes: [{name: 'DoctorApp'}, {name: 'PatientProfileScreen', params: {userId: this.props.route.params.userId}}],
                            })
                        }
                    >
                        <View style={{flex: 1,  }}>
                            <View style={{width: '50%', }}>
                                {/*<ProgressBar progress={(1+this.state.currentStage)/stages.length} color={currentTheme.colors.primary} />*/}
                                <StageProgressBar currentStage={this.state.currentStage}/>
                            </View>
                        </View>
                    </CustomContentScreenHeader>
                    <View style={styles.mainContainer}>
                        <ConditionalRender hidden={!this.state.loaded}>
                            <StageNavigator
                                navigation={this.props.navigation}
                                route={this.props.route}
                                visitInfo={this.state.visitInfo}
                                userId={this.props.route.params.userId}
                                onNewStage={this.onNewStage}
                                currentStage={this.state.currentStage}
                                onFinish={() => this.setState({finishVisitDialogOpen: true})}
                            />
                        </ConditionalRender>
                    </View>
                    <FinishVisitDialog
                        visible={this.state.finishVisitDialogOpen}
                        onDismiss={() => this.setState({finishVisitDialogOpen: false})}
                        onFinish={this.finishVisit}
                    />
                </ScreenLayout>
            </LoadingScreen>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: currentTheme.colors.surface,
    }
})


const StageProgressBar = (props) => {
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
                color={props.currentStage == i ? currentTheme.colors.primary : currentTheme.colors.placeholder}
                key={i}
            />
        )
    }

    return (
        <View
            style={{
                flexDirection: 'row',
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
    <Dialog.Content color={currentTheme.colors.placeholder} style={{paddingTop: 20}}>
        <Subheading style={{textAlign: 'center'}}>{props.children}</Subheading>
    </Dialog.Content>
)}
