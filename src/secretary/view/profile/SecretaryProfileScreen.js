import React from "react";
import {rootDao} from "../../../root/data/dao/RootDao";
import * as Profile from "../../../root/view/screen/Profile";
import {StyleSheet} from "react-native";
import {guessGender, hasValue} from "../../../root/domain/util/Util";
import {UserRoleDescription} from "../../../root/domain/Role";


class SecretaryProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logoutDialogVisible: false,
            isLoggingOut: false,
            user: {},
        }
    }

    componentDidMount = async () => {
        const user = await rootDao.getUser();
        this.setState({user: user});
    }

    logout = () => {
        this.setState({isLoggingOut: true}, () => {
            rootDao.logout()
                .then(res => {
                    this.setState({isLoggingOut: true, logoutDialogVisible: false}, () => {
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{name: 'ROOT'}],
                        });
                    })
                });
        });
    }

    goToSettings = () => {
        // this.props.navigation.navigate('SettingsScreen', {userInfo: this.state.userInfo});
    }

    render() {
        const workPlace = hasValue((this.state.user.workPlaces || [])[0]) ? this.state.user.workPlaces[0].name : '';
        const role = hasValue(this.state.user.userInfo) ? (UserRoleDescription[this.state.user.userInfo.role] || '') : '';

        return (
            <>
                <Profile.Screen
                    title={this.state.user.fullName}
                    captionList={[workPlace, role]}
                    gender={guessGender(this.state.user) == 'F' ? 'F' : 'M'}
                    menu={[
                        {
                            title: 'مشخصات من',
                            iconId: 'circle-edit-outline',
                        },
                        {
                            title: 'تنظیمات',
                            iconId: 'tune',
                            onPress: () => this.goToSettings(),
                        },
                        {
                            title: 'خروج',
                            iconId: 'logout-variant',
                            onPress: () => this.setState({logoutDialogVisible: true})
                        },
                    ]}
                />
                <Profile.LogoutDialog
                    visible={this.state.logoutDialogVisible}
                    onDismiss={() => {this.setState({logoutDialogVisible: false})}}
                    onLogout = {this.logout}
                    logoutButtonLoading={this.state.isLoggingOut}
                    dismissable={true}
                />
            </>
        );
    }
}

export default SecretaryProfileScreen;


const styles = StyleSheet.create({
});

