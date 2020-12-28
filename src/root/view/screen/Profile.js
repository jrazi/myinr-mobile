import React from "react";
import {StyleSheet, View} from "react-native";
import {
    DefaultTheme,
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
    Text, Subheading
} from 'react-native-paper';
import {fullSize} from "../styles/containers";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {currentTheme} from "../../../../theme";
import {useNavigation} from '@react-navigation/native';

export const Wrapper = (props) => {return (
    <View style={styles.container}>
        {props.children}
    </View>

)}

export const Header = (props) => {
    let navigation = useNavigation();
    return (
    <Surface style={styles.appBarHeader}>
        <View style={styles.appBarHeaderWrapper}>
            <View style={styles.headerOfHeader}>
                <Title style={{color: currentTheme.colors.primary}}>پروفایل کاربری</Title>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} color={currentTheme.colors.placeholder}/>
            </View>
            <View style={styles.bodyOfHeader}>
                <View
                    style = {{
                        backgroundColor: currentTheme.colors.primary,
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

export const Options = (props) => {return (
    <View style={styles.containerBody}>
        <List.Section>
            {props.children}
        </List.Section>
    </View>
)}

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
    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onDismiss} style={{paddingBottom: 10}} dismissable={true}>
                <Dialog.Content color={currentTheme.colors.placeholder}>
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

export const Screen = (props) => {return (
    <Wrapper>
        <Header
            avatar={<SimpleLineIcons style={{}} name={props.gender == 'F' ? 'user-female' : 'user'} size={40} color={'white'}/>}
            title={props.title}
            caption={props.caption}
        />
        <Options>
            {
                props.menu.map(item => {return (
                    <MenuItem
                        title={item.title}
                        left={(props) => <List.Icon icon={item.iconId} color={currentTheme.colors.primary}/>}
                        onPress={item.onPress}
                        key={item.title}
                    />
                )})
            }
        </Options>
    </Wrapper>
)}


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
    avatar: {
        backgroundColor: currentTheme.colors.primary,
    },
    containerBody: {
        padding: 20,
        backgroundColor: currentTheme.colors.background,
        flexGrow: 1,
    },
    profileMenuItemContainer: {
        elevation: 4,
        marginVertical: 10,
    },
    profileMenuItem: {
    }
});

