import React from "react";
import {ScreenLayout, TitleOnlyScreenHeader} from "../../root/view/screen/Layout";
import {Avatar, Button, Card, FAB, Surface, Text, TouchableRipple, useTheme, withTheme} from "react-native-paper";
import {
    ConditionalCollapsibleRender, ConditionalRender,
    IntraSectionInvisibleDivider
} from "../../doctor/view/patients/visit/first/forms/Layout";
import {
    IncomingMessageCard,
    MessageInfoRows,
} from "../../doctor/view/televisit/cards/MessageCard";
import {ItemListContainer} from "../../root/view/list/ItemList";
import {patientDao} from "../data/dao/PatientDao";
import {MessageListFilter} from "./filter/MessageListFilter";
import {MessageListFilterType, messageListStore} from "./store/MessageListStore";
import {StyleSheet, View} from "react-native";
import {rootDao} from "../../root/data/dao/RootDao";
import {showMessage} from "react-native-flash-message";

class MessageListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loadingMessages: true,
            loadingUser: true,
            messagesToDisplay: [],
            messageListFilterType: MessageListFilterType.ALL,
        }
        this.messageStore = messageListStore;
        this.user = null;
    }

    componentDidMount() {
        rootDao.getUser().then(user => {
            this.user = user;
            this.setState({loadingUser: false});
            this.loadMessages();
        });
    }

    loadMessages =  () => {
        this.setState({loadingMessages: true}, async () => {
            const messages = await patientDao.getAllMessages({merge: true}).catch(e => this.setState({loadingMessages: false}));

            this.messageStore.changeMessages(messages);

            const messagesToDisplay = this.messageStore.filterByType(this.state.messageListFilterType);

            this.setState({
                messagesToDisplay: messagesToDisplay,
                loadingMessages: false,
            })

        });
    }

    filterMessages = (type) => {
        this.setState({loadingMessages: true, messageListFilterType: type}, async () => {
            setTimeout(() => {
                const messagesToDisplay = this.messageStore.filterByType(this.state.messageListFilterType);

                this.setState({
                    messagesToDisplay: messagesToDisplay,
                    loadingMessages: false,
                })

            }, 700)
        });
    }

    navigateToMessageForm = () => {
        showMessage({
            message: 'این بخش غیرفعال است',
            description: null,
            type: "warning",
        });
    }

    render() {
        return (
            <ScreenLayout>
                <ControlHeader
                    filterAllMessages={() => this.filterMessages(MessageListFilterType.ALL)}
                    filterMyMessages={() => this.filterMessages(MessageListFilterType.MY_MESSAGES)}
                    filterPhysicianMessages={() => this.filterMessages(MessageListFilterType.PHYSICIAN_MESSAGES)}
                />
                <MessageList
                    messages={this.state.messagesToDisplay}
                    refreshing={this.state.loadingMessages || this.state.loadingUser}
                    onRefresh={this.loadMessages}
                    navigation={this.props.navigation}
                    patientInfo={this.user}
                />
                <View style={styles.fabContainer}>
                    <ConditionalRender hidden={false}>
                        <View style={styles.fabWrapper}>
                            <FAB
                                style={[styles.fab, {
                                    backgroundColor: this.props.theme.colors.actionColors.confirm,
                                }]}
                                icon={'message-text'}
                                label={'ارسال پیام'}
                                onPress={this.navigateToMessageForm}

                            />
                        </View>
                    </ConditionalRender>
                </View>
            </ScreenLayout>
        );
    }
}

export default withTheme(MessageListScreen);

const MessageList = (props) => {
    const messageItems = props.messages.map((message, index) => {
        return (
            <MessageCard
                key={`MessageCard_${message.id}`}
                message={message}
                patientInfo={props.patientInfo}
                index={index}
                navigation={props.navigation}
            />
        )
    })

    return (
        <ItemListContainer
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
        >
            {
                messageItems
            }
        </ItemListContainer>
    )
}

const ControlHeader = (props) => {
    const theme = useTheme();

    return (
        <Surface style={{elevation: 4}}>
            <TitleOnlyScreenHeader
                title="پیام‌ها"
                style={{elevation: 0}}
            />
            <ConditionalCollapsibleRender hidden={false}>
                <MessageListFilter
                    filterAllMessages={props.filterAllMessages}
                    filterMyMessages={props.filterMyMessages}
                    filterPhysicianMessages={props.filterPhysicianMessages}
                />
            </ConditionalCollapsibleRender>
        </Surface>
    )
}



export const MessageCard = (props) => {
    const theme = useTheme();

    const patientInfo = props.patientInfo || {};
    const physicianInfo = props.patientInfo.physician || {};

    const isFromPatient = props.message.meta.fromPatient || false;

    const title = isFromPatient ? '' : 'دکتر' + ' ' + physicianInfo.fullName;

    const PhysicianAvatar = (_props) => (
        <Avatar.Icon
            size={40}
            icon={'message-reply-text'}
            style={{backgroundColor: theme.colors.accent}}
        />
    );

    const PatientAvatar = (_props) => (
        <Avatar.Icon
            size={40}
            icon={'message-text'}
            style={{backgroundColor: theme.colors.accent}}
        />
    );

    const avatar = isFromPatient ? <PatientAvatar/> : <PhysicianAvatar/>;

    const CardContainer = ({index, style, ...props}) => {
        if (index % 2 == 0) {
            return <View style={[{}, style]}>
                {props.children}
            </View>
        } else return <Surface style={[{elevation: 0,}, style]}>
            {props.children}
        </Surface>
    }

    const navigateToMessage = () => {
        const route = props.message.meta.fromPatient ? 'MessageFromPatientScreen' : 'MessageFromPhysicianScreen';
        props.navigation.navigate(
            route,
            {
                message: props.message,
            },
        );
    }

    return (
        <CardContainer
            index={props.index}
            style={[
                {
                },
               styles.cardContainer
            ]}
        >
            <TouchableRipple
                onPress={navigateToMessage}
                rippleColor="rgba(0, 0, 0, .1)"
                delayPressIn={ 100 }
            >
                <View style={{
                    // paddingBottom: 10,
                    paddingVertical: 10,
                }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Card.Title
                            title={' ' + title}
                            subtitle={''}
                            style={{
                                flexGrow: 0,
                                width: '90%',
                            }}
                            left={
                                () => (
                                    <View
                                        style={{
                                            // paddingRight: 20,
                                        }}
                                    >
                                        {avatar}
                                    </View>
                                )
                            }
                        />

                    </View>
                    <Card.Content>
                        <View>
                            <MessageInfoRows message={props.message}/>
                        </View>
                    </Card.Content>
                    <IntraSectionInvisibleDivider none borderWidth={0.1} style={{marginHorizontal: 20, marginTop: 10,}}/>
                </View>
            </TouchableRipple>
        </CardContainer>
    );
}

const styles = StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        margin: 24,
        left: 0,
        bottom: 0,
    },
    fabWrapper: {
        paddingTop: 15,
        alignItems: 'center',
    },
    fab: {
    },
    container: {
        flex: 1,
        // backgroundColor: 'white',
    },

    cardContainer: {},
})
