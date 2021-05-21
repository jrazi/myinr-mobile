import React from "react";
import {rootDao} from "../../root/data/dao/RootDao";
import {UserRole} from "../../root/domain/Role";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {withTheme} from "react-native-paper";
import UnderConstruction from "../../root/view/screen/UnderConstruction";
import SecretaryProfileScreen from "./profile/SecretaryProfileScreen";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import SecretaryPatientsScreen from "./patients/SecretaryPatientsScreen";

const Tab = createMaterialBottomTabNavigator();

class SecretaryApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        }
        this.user = {};
    }

    componentDidMount() {
        rootDao.getUser().then(user => {
            if (user == null) this.props.navigation.navigate('LOGIN');
            else if (user.userInfo.role != UserRole.SECRETARY) this.props.navigation.navigate('LOGIN');
            else this.user = user;
        });
    }

    render() {
        const colors = this.props.theme.colors;
        const theme = this.props.theme;
        return (
            <Tab.Navigator
                initialRouteName={"secretary/patients"}
                barStyle={{ backgroundColor: theme.colors.surface,}}
                shifting={false}
                backBehavior={'history'}
                activeColor={theme.colors.accent}
                inactiveColor={theme.colors.backdrop}
                lazy={false}
            >
                <Tab.Screen
                    name="secretary/patients"
                    component={SecretaryPatientsScreen}
                    options={{
                        tabBarLabel: 'بیماران',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="clipboard-pulse-outline" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="secretary/profile"
                    component={SecretaryProfileScreen}
                    options={{
                        tabBarLabel: 'پروفایل من',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="account-outline" color={color} size={26} />
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
};

export default withTheme(SecretaryApp);


