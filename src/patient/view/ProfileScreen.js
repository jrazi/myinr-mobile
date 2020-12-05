import React from "react";
import {StyleSheet, View} from "react-native";
import {DefaultTheme, Appbar, Surface, Title, Caption, List, TouchableRipple, Portal, Dialog, Paragraph, Button} from 'react-native-paper';
import {fullSize} from "../../root/view/styles/containers";
import Icons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
import {serverGateway} from "../../root/data/server/ServerGateway";
import {rootDao} from "../../root/data/dao/RootDao";
import {currentTheme} from "../../../theme";

class ProfileScreen extends React.Component {
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
            serverGateway.logout('')
                .then(res => {
                    rootDao.deleteUser()
                        .then(user => {
                            this.setState({isLoggingOut: true}, () => {
                                this.props.navigation.reset({
                                    index: 0,
                                    routes: [{name: 'LOGIN'}],
                                });
                            })
                        })
                });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Surface style={styles.appBarHeader}>
                    <View style={styles.appBarHeaderWrapper}>
                        <View style={styles.headerOfHeader}>
                            <Title style={{color: currentTheme.colors.primary}}>پروفایل کاربری</Title>
                            <Appbar.Action icon="arrow-left" onPress={() => this.props.navigation.goBack()} color={currentTheme.colors.placeholder}/>
                        </View>
                        <View style={styles.bodyOfHeader}>
                            <Icons style={styles.avatar} name={'user'} size={150} color={currentTheme.colors.placeholder}/>
                            <View
                                style={{
                                    alignItems: 'center',
                                }}
                            >
                                <Title>{this.state.user.fullName}</Title>
                                <Caption>{null}</Caption>
                            </View>
                        </View>
                    </View>
                </Surface>
                <View style={styles.containerBody}>
                    <List.Section>
                        <MenuItem
                            title={'مشخصات من'}
                            left={(props) => <List.Icon icon={'circle-edit-outline'} color={currentTheme.colors.primary}/>}
                        />
                        <MenuItem
                            title={'تنظیمات'}
                            left={(props) => <List.Icon icon={'tune'} color={currentTheme.colors.primary}/>}
                        />
                        <MenuItem
                            title={'خروج'}
                            left={(props) => <List.Icon icon={'logout-variant'} color={currentTheme.colors.primary}/>}
                            onPress={() => this.setState({logoutDialogVisible: true})}
                        />
                    </List.Section>
                </View>
                <LogoutDialog
                    visible={this.state.logoutDialogVisible}
                    onDismiss={() => {this.setState({logoutDialogVisible: false})}}
                    onLogout = {this.logout}
                    logoutButtonLoading={this.state.isLoggingOut}
                    dismissable={true}
                />
            </View>
        );
    }
}

export default ProfileScreen;

const MenuItem = (props) => {
    return (
        <Surface style={styles.profileMenuItemContainer}>
            <TouchableRipple
                onPress={props.onPress != undefined ? props.onPress : (() => {})}
                rippleColor="rgba(0, 0, 0, .2)"
            >
                <List.Item
                    style={styles.profileMenuItem}
                    title={props.title}
                    right={props => <List.Icon icon="arrow-left"/>}
                    left={props.left}
                />
            </TouchableRipple>
        </Surface>
    );
}

const LogoutDialog = (props) => {
    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onDismiss} style={{paddingBottom: 10}} dismissable={false}>
                <Dialog.Title color={currentTheme.colors.placeholder}>آیا می‌خواهید خارج شوید؟</Dialog.Title>
                <Dialog.Actions >
                    <Button style={{width: 70, }} mode="text" loading={props.logoutButtonLoading} onPress={props.onLogout} >بله</Button>
                    <Button disabled={!props.dismissable} style={{width: 50, }} mode="text" onPress={props.onDismiss} >خیر</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        // backgroundColor: '#fff',
        ...fullSize,
        // paddingVertical: 10,
        // paddingHorizontal: 30,

    },
    appBarHeader: {
        elevation: 4,
        paddingLeft: 15,
        paddingRight: 10,
        paddingTop: 40,
    },
    appBarHeaderWrapper: {
        flexGrow: 1,
    },
    headerOfHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bodyOfHeader: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 20,
    },
    avatar: {
    },
    containerBody: {
        padding: 20,
    },
    profileMenuItemContainer: {
        elevation: 4,
        marginVertical: 10,
    },
    profileMenuItem: {
    }
});

