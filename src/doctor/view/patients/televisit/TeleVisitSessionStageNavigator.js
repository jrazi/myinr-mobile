import React from 'react';

import {View} from "react-native";
import {fullSize} from "../../../../root/view/styles/containers";
import {BottomNavigation, withTheme} from "react-native-paper";
import {createStackNavigator} from "@react-navigation/stack";
import {firstNonEmpty} from "../../../../root/domain/util/Util";
import {get_stage_names, get_stages} from "./TeleVisitSessionMetadata";




class TeleVisitSessionStageNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'next', title: 'Next', icon: 'chevron-right' },
                { key: 'prev', title: 'Previous', icon: 'chevron-left' },
            ],
        }
    }

    teleVisitData() {
        return {
            physicianMessage: this.props.physicianMessage,
            patientMessage: this.props.patientMessage,
            lastVisit: this.props.lastVisit,
            lastWarfarinDosage: this.props.lastWarfarinDosage,
        }
    }
    stages() {
        return get_stages(this.props.route.params.readonly);
    }

    totalStageCount() {
        return this.stages().length;
    };

    getNextIndex(index) {
        return (index + 1) % this.totalStageCount();
    }

    getPrevIndex(index) {
        const totalStageCount = this.totalStageCount();
        return (index + totalStageCount - 1) % totalStageCount;
    }

    getButtonTitle(currentStageIndex) {
        const nextStageIndex = this.getNextIndex(currentStageIndex);
        const prevStageIndex = this.getPrevIndex(currentStageIndex);

        const stage_names = get_stage_names(this.props.route.params.readonly);

        return {
            prev: stage_names[prevStageIndex] || "Previous",
            next: stage_names[nextStageIndex] || "Next",
        }
    }

    componentDidMount() {
        const buttonTitles = this.getButtonTitle(this.props.currentStage);
        this.state.routes[0].title = buttonTitles.next;
        this.state.routes[1].title = buttonTitles.prev;

        this.props.navigation.navigate(this.props.route.name, {screen: `TeleVisit_Stage:${this.props.currentStage}`, ...this.teleVisitData()});
        this.setState({routes: this.state.routes})
    }

    onIndexChange = (index) => {
    }

    onTabPress = ({route}) => {
        const goingForward = route.key == 'next';
        const nextCurrentStage = goingForward ? this.getNextIndex(this.props.currentStage) : this.getPrevIndex(this.props.currentStage);
        const buttonTitles = this.getButtonTitle(nextCurrentStage);

        this.state.routes[0].title = buttonTitles.next;
        this.state.routes[1].title = buttonTitles.prev;

        this.props.onNewStage(nextCurrentStage);

        this.props.navigation.navigate(
            `TeleVisit_Stage:${nextCurrentStage}`,
            this.teleVisitData(),
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        const theme = this.props.theme;
        const renderScene = ({ route, jumpTo }) => {
            return <StageNavStack
                patientMessage={this.props.patientMessage}
                physicianMessage={this.props.physicianMessage}
                lastVisit={this.props.lastVisit}
                lastWarfarinDosage={this.props.lastWarfarinDosage}
                readonly={this.props.route.params.readonly}
                userId={this.props.userId}
                currentStage={this.props.currentStage}
            />;
        }

        return (
            <View style={{...fullSize}}>
                <BottomNavigation
                    navigationState={{ index: this.state.index, routes: this.state.routes }}
                    onIndexChange={this.onIndexChange}
                    renderScene={renderScene}
                    shifting={false}
                    activeColor={theme.colors.primary}
                    inactiveColor={theme.colors.primary}
                    theme={theme.mostlyWhiteTheme}
                    onTabPress={this.onTabPress}
                />
            </View>
        )
    }
};

export default withTheme(TeleVisitSessionStageNavigator);

const Stack = createStackNavigator();

const StageNavStack = (props) => {
    const stages = get_stages(props.readonly);
    return (
        <Stack.Navigator
            initialRoute={`TeleVisit_Stage:${firstNonEmpty(props.currentStage, 0)}`}
        >
            {
                stages.map((stage, index) => {
                    return (
                        <Stack.Screen
                            name={`TeleVisit_Stage:${index}`}
                            component={stage}
                            options={{ headerShown: false , headerTitle: props => null }}
                            initialParams={{
                                physicianMessage: props.physicianMessage,
                                patientMessage: props.patientMessage,
                                lastVisit: props.lastVisit,
                                lastWarfarinDosage: props.lastWarfarinDosage,
                                userId: props.userId,
                                readonly: props.readonly,
                            }}
                            key={`TeleVisit_Stage:${index}`}
                        />
                    )
                })
            }
        </Stack.Navigator>
    )}
