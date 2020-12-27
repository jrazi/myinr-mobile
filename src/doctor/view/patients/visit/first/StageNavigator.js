import React from 'react';
import {BottomNavigation, useTheme} from "react-native-paper";
import {currentTheme, mostlyWhiteTheme} from "../../../../../../theme";
import {firstNonEmpty, hasValue} from "../../../../../root/domain/util/Util";
import {stages} from "./FirstVisitProperties";
import {createStackNavigator} from "@react-navigation/stack";
import {StyleSheet, View} from "react-native";
import {fullSize} from "../../../../../root/view/styles/containers";
import {AddDrugRecord} from "./AddDrugRecord";
import {DrugDatePicker} from "./DrugDatePicker";

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
        if (this.props.currentStage == stages.length - 1) {
            this.state.routes[1].title = 'اتمام ویزیت';
        }
        this.props.navigation.navigate(this.props.route.name, {screen: `VisitStage:${this.props.currentStage}`, visitInfo: this.props.visitInfo});
        this.setState({routes: this.state.routes})
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

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {

        const renderScene = ({ route, jumpTo }) => {
            return <StageNavStack visitInfo={this.props.visitInfo} userId={this.props.userId} currentStage={this.props.currentStage}/>;
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

const StageNavStack = (props) => {
    return (
    <Stack.Navigator
        initialRoute={`VisitStage:${firstNonEmpty(props.currentStage, 0)}`}
    >
        {
            stages.map((stage, index) => {
                return (
                    <Stack.Screen
                        name={`VisitStage:${index}`}
                        component={stage}
                        options={{ headerShown: false , headerTitle: props => null }}
                        initialParams={{visitInfo: props.visitInfo, userId: props.userId}}
                        key={`VisitStage:${index}`}
                    />
                )
            })
        }
        {[
            <Stack.Screen
                name={`Secondary:AddDrugRecord`}
                component={AddDrugRecord}
                options={{ headerShown: false , headerTitle: props => null }}
                initialParams={{visitInfo: props.visitInfo, userId: props.userId}}
                key={`Secondary:AddDrugRecord`}
            />,
            <Stack.Screen
                name={`Secondary:DrugDatePicker`}
                component={DrugDatePicker}
                options={{ headerShown: false , headerTitle: props => null }}
                initialParams={{userId: props.userId, drugInfo: {}}}
                key={`Secondary:DrugDatePicker`}
            />
        ]}

    </Stack.Navigator>
)}

