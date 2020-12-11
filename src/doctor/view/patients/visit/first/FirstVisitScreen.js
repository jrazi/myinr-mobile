import React from "react";
import {StyleSheet, View} from "react-native";
import {ProgressBar} from "react-native-paper";
import {CustomContentScreenHeader, ScreenLayout} from "../../../../../root/view/screen/Layout";
import {FirstVisit} from "../../../../domain/visit/Visit";
import {doctorDao} from "../../../../data/dao/DoctorDao";
import {currentTheme} from "../../../../../../theme";
import StageNavigator from "./StageNavigator";


export class FirstVisitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visitInfo: FirstVisit.createNew(),
            currentStage: 0,
        }
    }

    componentDidMount() {
        const {userId, useCache} = this.props.route.params;
        if (useCache != true) return;

        doctorDao.getCachedVisit(userId)
            .then(cachedVisit => {
                this.setState({visitInfo: cachedVisit.visitInfo, currentStage: cachedVisit.currentStage})
            })
            .catch(err => {
                this.setState({visitInfo: FirstVisit.createNew(), currentStage: 0})
            })
    }

    cacheVisit = () => {
        doctorDao.saveCachedVisit(
            this.props.route.params.userId,
            {currentStage: this.state.currentStage, visitInfo: this.state.visitInfo}
        );
    }

    onNewStage = (stageIndex) => {
        this.setState({currentStage: stageIndex}, () => {
            // this.cacheVisit();
        });
    }

    render() {
        return (
            <ScreenLayout>
                <CustomContentScreenHeader>
                    <View style={{flex: 1}}>
                        <View style={{width: '50%'}}>
                            <ProgressBar progress={0.2} color={currentTheme.colors.primary} />
                        </View>
                    </View>
                </CustomContentScreenHeader>
                <View style={styles.mainContainer}>
                    <StageNavigator
                        navigation={this.props.navigation}
                        visitInfo={this.state.visitInfo}
                        onNewStage={this.onNewStage}
                        currentStage={this.state.currentStage}
                    />
                </View>
            </ScreenLayout>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: currentTheme.colors.surface,
    }
})


