import React from 'react';
import {BottomNavigation, useTheme} from "react-native-paper";
import {currentTheme, mostlyWhiteTheme} from "../../../../../../theme";
import {hasValue} from "../../../../../root/domain/util/Util";
import {stages} from "./FirstVisitProperties";
import {createStackNavigator} from "@react-navigation/stack";
import {PreliminaryStage} from "./PreliminaryStage";
import {HasBledScoreStage} from "./HasBledScoreStage";
import {DosageRecommendationStage} from "./DosageRecommendtionStage";
import {StyleSheet, View} from "react-native";
import {fullSize} from "../../../../../root/view/styles/containers";

class StageNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'prev', title: 'قبلی', icon: 'chevron-right' },
                { key: 'next', title: 'بعدی', icon: 'chevron-left' },
            ],
            currentStage: 0,
        }
    }

    componentDidMount() {
    }

    onIndexChange = (index) => {
        // this.setState({index:  index});
    }

    onTabPress = ({route}) => {
        const index = route.key == 'prev' ? 0 : 1;
        console.log('index is', index, this.state.currentStage, stages.length);
        if (index == 0 && this.state.currentStage == 0) return;
        if (index == 1 && this.state.currentStage == stages.length-1) {
            if (hasValue(this.props.onFinish)) this.props.onFinish();
            return;
        }

        console.log('and index is here', index);
        if (index == 1 && this.state.currentStage == stages.length - 2) {
            this.state.routes[1].title = 'اتمام ویزیت';
        }
        else if (index == 0 && this.state.currentStage == stages.length-1) {
            this.state.routes[1].title = 'بعدی';
        }

        const inc = index == 0 ? -1 : index == 1 ? 1 : 0;

        this.setState({currentStage: this.state.currentStage + inc}, () => {
            if (hasValue(this.props.onNewStage) && inc != 0) this.props.onNewStage(this.state.currentStage);
            this.props.navigation.navigate(this.state.currentStage == 0 ? "T1" : this.state.currentStage == 1 ? "T2" : "T3")
        });
    }

    render() {

        const renderScene = ({ route, jumpTo }) => {
            let Component = stages[this.state.currentStage];
            return <StageNavStack/>;
            // return <Component/>;
            return null;
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
        initialRoute={'T1'}
    >
        <Stack.Screen
            name={'T1'}
            component={PreliminaryStage}
            options={{ headerShown: false , headerTitle: props => null }}
        />
        <Stack.Screen
            name={'T2'}
            component={HasBledScoreStage}
            options={{ headerShown: false , headerTitle: props => null }}
            initialParams={{ userId: null }}
        />
        <Stack.Screen
            name={'T3'}
            component={DosageRecommendationStage}
            options={{ headerShown: false , headerTitle: props => null }}
            initialParams={{ userId: null }}
        />
    </Stack.Navigator>
)}


export default function(props) {
    const defaultTheme = useTheme();

    return <StageNavigator {...props} defaultTheme={defaultTheme}/>;
}
