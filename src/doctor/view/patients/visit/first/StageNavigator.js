import React from 'react';
import {BottomNavigation, useTheme} from "react-native-paper";
import {currentTheme, mostlyWhiteTheme} from "../../../../../../theme";
import {hasValue} from "../../../../../root/domain/util/Util";
import {stages} from "./FirstVisitProperties";
import {createStackNavigator} from "@react-navigation/stack";
import {StyleSheet, View} from "react-native";
import {fullSize} from "../../../../../root/view/styles/containers";

export default class StageNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'prev', title: 'قبلی', icon: 'chevron-right' },
                { key: 'next', title: 'بعدی', icon: 'chevron-left' },
            ],
        }
    }

    componentDidMount() {
    }

    onIndexChange = (index) => {
        // this.setState({index:  index});
    }

    onTabPress = ({route}) => {
        const index = route.key == 'prev' ? 0 : 1;
        if (index == 0 && this.props.currentStage == 0) return;
        if (index == 1 && this.props.currentStage == stages.length-1) {
            if (hasValue(this.props.onFinish)) this.props.onFinish();
            return;
        }

        if (index == 1 && this.props.currentStage == stages.length - 2) {
            this.state.routes[1].title = 'اتمام ویزیت';
        }
        else if (index == 0 && this.props.currentStage == stages.length-1) {
            this.state.routes[1].title = 'بعدی';
        }

        const inc = index == 0 ? -1 : index == 1 ? 1 : 0;
        const newStage = this.props.currentStage + inc;

        if (hasValue(this.props.onNewStage) && inc != 0) this.props.onNewStage(newStage);
        this.props.navigation.navigate(`VisitStage:${newStage}`, {visitInfo: this.props.visitInfo});
    }

    render() {

        const renderScene = ({ route, jumpTo }) => {
            return <StageNavStack visitInfo={this.props.visitInfo}/>;
        }

        return (
            <View style={{...fullSize}}>
                <BottomNavigation
                    navigationState={{ index: this.state.index, routes: this.state.routes }}
                    onIndexChange={this.onIndexChange}
                    renderScene={renderScene}
                    shifting={false}
                    activeColor={currentTheme.colors.primary}
                    inactiveColor={currentTheme.colors.primary}
                    theme={mostlyWhiteTheme}
                    onTabPress={this.onTabPress}
                />
            </View>
        )
    }
};
const Stack = createStackNavigator();

const StageNavStack = (props) => {return (
    <Stack.Navigator
        initialRoute={'VisitStage:0'}
    >
        {
            stages.map((stage, index) => {
                return (
                    <Stack.Screen
                        name={`VisitStage:${index}`}
                        component={stage}
                        options={{ headerShown: false , headerTitle: props => null }}
                        initialParams={{visitInfo: props.visitInfo}}
                    />
                )
            })
        }

    </Stack.Navigator>
)}

