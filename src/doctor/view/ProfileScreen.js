import React from "react";
import {StyleSheet, View} from "react-native";
import {Appbar, Surface, Title, Caption, List, TouchableRipple} from 'react-native-paper';
import {fullSize} from "../../root/view/styles/containers";
import Icons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
import {serverGateway} from "../../root/data/server/ServerGateway";
import {rootDao} from "../../root/data/dao/RootDao";

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount = async () => {
    }

    logout = () => {
        serverGateway.logout('')
            .then(res => {
                rootDao.deleteUser()
                    .then(user => {
                        this.props.navigation.navigate('LOGIN');
                    })
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Surface style={styles.appBarHeader}>
                    <View style={styles.appBarHeaderWrapper}>
                        <View style={styles.headerOfHeader}>
                            <Title>پروفایل کاربری</Title>
                            <Appbar.Action icon="arrow-left" onPress={() => this.props.navigation.goBack()} />
                        </View>
                        <View style={styles.bodyOfHeader}>
                            <Icons style={styles.avatar} name={'user'} size={150}/>
                            <View>
                                <Title>جواد راضی</Title>
                                <Caption>بیمارستان شریعتی</Caption>
                            </View>
                        </View>
                    </View>
                </Surface>
                <View style={styles.containerBody}>
                    <List.Section>
                        <MenuItem
                            title={'مشخصات کاربر'}
                            left={(props) => <List.Icon icon={'circle-edit-outline'}/>}
                        />
                        <MenuItem
                            title={'تنظیمات'}
                            left={(props) => <List.Icon icon={'tune'}/>}
                        />
                        <MenuItem
                            title={'خروج'}
                            left={(props) => <List.Icon icon={'logout-variant'}/>}
                            onPress={this.logout}
                        />
                    </List.Section>
                </View>
            </View>
        );
    }
}

export default function(props) {
    const navigation = useNavigation();

    return <ProfileScreen {...props} navigation={navigation} />;
}

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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        ...fullSize,
    },
    appBarHeader: {
        elevation: 4,
        padding: 20,
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

