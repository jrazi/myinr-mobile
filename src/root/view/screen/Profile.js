import React from "react";
import {StyleSheet, View} from "react-native";
import {
    Appbar,
    Surface,
    Title,
    Caption,
    List,
    TouchableRipple,
    Portal,
    Dialog,
    Paragraph,
    Button,
    Text, Subheading, useTheme
} from 'react-native-paper';
import {fullSize} from "../styles/containers";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import {debugBorderRed} from "../styles/borders";
import {e2p} from "../../domain/util/Util";
import AppConfig from "../../../../AppConfig";

export const Wrapper = (props) => {return (
    <View style={styles.container}>
        {props.children}
    </View>

)}

export const Header = (props) => {
    const theme = useTheme();
    let navigation = useNavigation();
    return (
    <Surface style={styles.appBarHeader}>
        <View style={styles.appBarHeaderWrapper}>
            <View style={styles.headerOfHeader}>
                <Title style={{color: theme.colors.primary}}>پروفایل کاربری</Title>
                <Appbar.Action icon="arrow-left" size={28} onPress={() => navigation.goBack()} color={theme.colors.placeholder}/>
            </View>
            <View style={styles.bodyOfHeader}>
                <View
                    style = {{
                        backgroundColor: theme.colors.primary,
                        borderRadius: 100,
                        padding: 25,
                    }}
                >
                    {props.avatar}
                </View>
                <View
                    style={{
                        alignItems: 'center',
                    }}
                >
                    <Title>{props.title}</Title>
                    <Caption>{props.caption}</Caption>
                </View>
            </View>
        </View>
    </Surface>
)}

export const Options = (props) => {
    const theme = useTheme();
    return (
        <View style={{padding: 20, backgroundColor: theme.colors.background, flexGrow: 1,}}>
            <List.Section>
                {props.children}
            </List.Section>
        </View>
    )
}

export const MenuItem = (props) => {
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

export const LogoutDialog = (props) => {
    const theme = useTheme();
    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onDismiss} style={{paddingBottom: 10}} dismissable={true}>
                <Dialog.Content color={theme.colors.placeholder}>
                    <Subheading style={{textAlign: 'center'}}>آیا می‌خواهید خارج شوید؟</Subheading>
                </Dialog.Content>
                <Dialog.Actions style={{alignItems: 'center', justifyContent: 'space-around',}}>
                    <Button style={{width: 70, }} mode="text" loading={props.logoutButtonLoading} onPress={props.onLogout} >بله</Button>
                    <Button disabled={!props.dismissable} style={{width: 50, }} mode="text" onPress={props.onDismiss} >خیر</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const ApplicationVersion = (props) => {
    const theme = useTheme();
    const version = AppConfig.version;
    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 0,
                backgroundColor: theme.colors.background,
                paddingVertical: 20,
            }}
        >
            <Caption style={{fontSize: 16}}>{'نسخه برنامه: ' + e2p(version)}</Caption>
        </View>
    )
}
export const Screen = (props) => {
    const theme = useTheme();
    return (
        <Wrapper>
            <Header
                avatar={<SimpleLineIcons style={{}} name={props.gender == 'F' ? 'user-female' : 'user'} size={40} color={theme.colors.surface}/>}
                title={props.title}
                caption={props.caption}
            />
            <Options>
                {
                    props.menu.map(item => {return (
                        <MenuItem
                            title={item.title}
                            left={(props) => <List.Icon icon={item.iconId} color={theme.colors.primary}/>}
                            onPress={item.onPress}
                            key={item.title}
                        />
                    )})
                }
            </Options>
            <ApplicationVersion/>
        </Wrapper>
    )
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
        paddingVertical: 20,
    },
    profileMenuItemContainer: {
        elevation: 4,
        marginVertical: 10,
    },
    profileMenuItem: {
    }
});

