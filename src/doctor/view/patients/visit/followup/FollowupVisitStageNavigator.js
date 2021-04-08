import React from 'react';
import {BottomNavigation, useTheme, withTheme} from "react-native-paper";
import {firstNonEmpty, hasValue} from "../../../../../root/domain/util/Util";
import {STAGE_NAMES, stages} from "./FollowupVisitMetadata";
import {createStackNavigator} from "@react-navigation/stack";
import {StyleSheet, View} from "react-native";
import {fullSize} from "../../../../../root/view/styles/containers";
import {AddDrugRecord} from "../first/AddDrugRecord";

const totalStageCount = stages.length;

function getNextIndex(index) {
    return (index + 1) % totalStageCount;
}

function getPrevIndex(index) {
    return (index + totalStageCount - 1) % totalStageCount;
}

function getButtonTitle(currentStageIndex) {
    const nextStageIndex = getNextIndex(currentStageIndex);
    const prevStageIndex = getPrevIndex(currentStageIndex);

    return {
        prev: STAGE_NAMES[prevStageIndex] || "Previous",
        next: STAGE_NAMES[nextStageIndex] || "Next",
    }
}


class FollowupVisitStageNavigator extends React.Component {
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

    componentDidMount() {
        const buttonTitles = getButtonTitle(this.props.currentStage);
        this.state.routes[0].title = buttonTitles.next;
        this.state.routes[1].title = buttonTitles.prev;

        this.props.navigation.navigate(this.props.route.name, {screen: `Followup_VisitStage:${this.props.currentStage}`, visitInfo: this.props.visitInfo});
        this.setState({routes: this.state.routes})
    }

    onIndexChange = (index) => {
    }

    onTabPress = ({route}) => {
        const goingForward = route.key == 'next';
        const nextCurrentStage = goingForward ? getNextIndex(this.props.currentStage) : getPrevIndex(this.props.currentStage);
        const buttonTitles = getButtonTitle(nextCurrentStage);

        this.state.routes[0].title = buttonTitles.next;
        this.state.routes[1].title = buttonTitles.prev;

        this.props.onNewStage(nextCurrentStage);
        this.props.navigation.navigate(`Followup_VisitStage:${nextCurrentStage}`, {visitInfo: this.props.visitInfo});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        const theme = this.props.theme;
        const renderScene = ({ route, jumpTo }) => {
            return <StageNavStack
                visitInfo={this.props.visitInfo}
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

export default withTheme(FollowupVisitStageNavigator);

const Stack = createStackNavigator();

const StageNavStack = (props) => {
    return (
    <Stack.Navigator
        initialRoute={`Followup_VisitStage:${firstNonEmpty(props.currentStage, 0)}`}
    >
        {
            stages.map((stage, index) => {
                return (
                    <Stack.Screen
                        name={`Followup_VisitStage:${index}`}
                        component={stage}
                        options={{ headerShown: false , headerTitle: props => null }}
                        initialParams={{visitInfo: props.visitInfo, userId: props.userId, readonly: props.readonly}}
                        key={`Followup_VisitStage:${index}`}
                    />
                )
            })
        }
        {[
            <Stack.Screen
                name={`Followup_VisitStage:AddDrugRecord`}
                component={AddDrugRecord}
                options={{ headerShown: false , headerTitle: props => null }}
                initialParams={{visitInfo: props.visitInfo, userId: props.userId, readonly: props.readonly}}
                key={`Followup_VisitStage:AddDrugRecord`}
            />,
        ]}

    </Stack.Navigator>
)}

