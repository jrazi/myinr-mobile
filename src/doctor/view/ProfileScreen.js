import React from "react";
import {StyleSheet, View} from "react-native";
import UnderConstruction from "../../root/view/screen/UnderConstruction";
import {Appbar, Avatar, Button, Text, Modal, Surface, Title, Headline, Subheading, Caption, List} from 'react-native-paper';
import {debugBorderBlue, debugBorderRed} from "../../root/view/styles/borders";
import {fullSize} from "../../root/view/styles/containers";
import {py3} from "../../root/view/styles/spacing";
import {AppbarHeader} from "react-native-paper/src/components/Appbar/AppbarHeader";
import Icons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';

const _goBack = () => console.log('Went back');



class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {}
    }

    componentDidMount = async () => {
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
                        <Surface style={styles.profileMenuItemContainer}>
                            <List.Item
                                style={styles.profileMenuItem}
                                title={"مشخصات کاربر"}
                                right={props => <List.Icon icon="arrow-left"/>}
                                left={props => <List.Icon icon="circle-edit-outline"/>}
                            />
                        </Surface>
                        <Surface style={styles.profileMenuItemContainer}>
                            <List.Item
                                style={styles.profileMenuItem}
                                title={"تنظیمات"}
                                right={props => <List.Icon icon="arrow-left"/>}
                                left={props => <List.Icon icon="tune"/>}
                            />
                        </Surface>
                        <Surface style={styles.profileMenuItemContainer}>
                            <List.Item
                                style={styles.profileMenuItem}
                                title={"خروج"}
                                right={props => <List.Icon icon="arrow-left"/>}
                                left={props => <List.Icon icon="logout-variant"/>}
                            />
                        </Surface>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '',
        justifyContent: 'flex-start',
        alignItems: 'stretch',

        // backgroundColor: '#fff',
        ...fullSize,
    },
    appBarHeader: {
        elevation: 4,
        padding: 20,
        paddingTop: 40,
        // ...debugBorderRed,
    },
    appBarHeaderWrapper: {
        // flex: 1,
        flexGrow: 1,
        // ...debugBorderRed,
        // flexWrap: 'nowrap',
        // flexBasis: 0,
    },
    headerOfHeader: {
        // alignSelf: 'flex-start',
        // ...debugBorderRed,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bodyOfHeader: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 20,
        // ...debugBorderRed,
    },
    avatar: {
        // borderRadius: 100,
        // borderWidth: 4,
        // borderColor: 'red',
        // padding: 20,
    },
    containerBody: {
        // flexGrow: 100,
        padding: 20,
    },
    profileMenuItemContainer: {
        elevation: 4,
        marginVertical: 10,
    },
    profileMenuItem: {
    }
});

