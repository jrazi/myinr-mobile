import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";

import {PatientProfileContext} from "./ContextProvider";
import {ScreenLayout} from "../../../../root/view/screen/Layout";
import {doctorMessageDao} from "../../../data/dao/DoctorMessageDao";
import {FAB, List, withTheme} from "react-native-paper";
import {ConditionalCollapsibleRender, ConditionalRender} from "../visit/first/forms/Layout";
import {EmptyList} from "../../../../root/view/list/EmptyListMessage";
import {ItemListContainer} from "../../../../root/view/list/ItemList";
import {IncomingMessageCard} from "../../televisit/cards/MessageCard";

export class _PatientTeleVisitTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingMessages: true,
            displayingIncomingMessages: true,
            displayingOutgoingMessages: false,
            messagesFromPatient: {
                new: [],
                previous: [],
            },
        }
    }

    static contextType = PatientProfileContext;

    componentDidMount() {
        this.loadMessages();
    }

    loadMessages =  () => {
        this.setState({loadingMessages: true}, async () => {
            const incomingMessages = await doctorMessageDao.getIncomingMessagesFromPatient(this.props.route.params.userId);

            this.setState({
                messagesFromPatient: incomingMessages,
                loadingMessages: false,
            })
        });
    }

     startTeleVisitSession = () => {
        this.props.navigation.navigate(
            'TeleVisitSessionScreen',
            {
                patientUserId: this.context.patient.userId,
            },
        );
    }

    render() {
        const theme = this.props.theme;

        return (
            <PatientProfileContext.Consumer>
                {(value) => {
                    return (
                        <ScreenLayout>
                            <MessageList
                                newMessages={this.state.messagesFromPatient.new}
                                previousMessages={this.state.messagesFromPatient.previous}
                                refreshing={this.state.loadingMessages}
                                onRefresh={this.loadMessages}
                                navigation={this.props.navigation}
                            />
                            <View style={styles.fabContainer}>
                                <ConditionalRender hidden={false}>
                                    <View style={styles.fabWrapper}>
                                        <FAB
                                            style={[styles.fab, {
                                                backgroundColor: theme.colors.actionColors.primary,
                                            }]}
                                            icon={'send'}
                                            onPress={this.startTeleVisitSession}
                                        />
                                    </View>
                                </ConditionalRender>
                            </View>
                        </ScreenLayout>
                    )}}
            </PatientProfileContext.Consumer>
        )
    }
}

export const PatientTeleVisitTab = withTheme(_PatientTeleVisitTab);

const MessageList = (props) => {
    const newMessageItems = props.newMessages.map((message, index) => {
        return (
            <IncomingMessageCard
                key={`New_IncomingMessageCard_${message.id}`}
                message={message}
                index={index}
                isNew={true}
                navigation={props.navigation}
            />
        )
    })

    const previousMessageItems = props.previousMessages.map((message, index) => {
        return (
            <IncomingMessageCard
                key={`Prev_IncomingMessageCard_${message.id}`}
                message={message}
                index={index}
                isNew={false}
                navigation={props.navigation}
            />
        )
    });

    const ListSection = ({listItems, refreshing, subheaderTitle, emptyListMessage}) => {
        return (
            <List.Section>
                <ConditionalCollapsibleRender key={`LIST_HEADER`} hidden={refreshing}>
                    <List.Subheader style={{}}>{subheaderTitle}</List.Subheader>
                    <EmptyList
                        hidden={refreshing || (listItems.length > 0)}
                        message={emptyListMessage}
                    />
                </ConditionalCollapsibleRender>
                {listItems}
            </List.Section>
        )
    }
    return (
        <ItemListContainer
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
            emptyListMessageEnabled={false}
        >
            {
                [
                    <ListSection key={`NewMessageSection`}
                                 listItems={newMessageItems}
                                 refreshing={props.refreshing}
                                 subheaderTitle={'پیام‌های جدید'}
                                 emptyListMessage={'پیام جدیدی وجود ندارد'}
                    />,
                    <ListSection key={`PrevMessageSection`}
                                 listItems={previousMessageItems}
                                 refreshing={props.refreshing}
                                 subheaderTitle={'پیام‌های پیشین'}
                                 emptyListMessage={'پیامی دریافت نشده'}
                    />,
                ]
            }
        </ItemListContainer>
    )
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
})

