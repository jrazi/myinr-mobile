import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";

import {PatientProfileContext} from "./ContextProvider";
import {doctorVisitDao} from "../../../data/dao/DoctorVisitDao";
import {FollowupVisit} from "../../../domain/visit/FollowupVisit";
import {ScreenLayout} from "../../../../root/view/screen/Layout";
import {doctorMessageDao} from "../../../data/dao/DoctorMessageDao";
import {AppointmentCard} from "./cards/AppointmentCard";
import {List} from "react-native-paper";
import {ConditionalCollapsibleRender} from "../visit/first/forms/Layout";
import {EmptyList} from "../../../../root/view/list/EmptyListMessage";
import {ItemListContainer} from "../../../../root/view/list/ItemList";
import {IncomingMessageCard} from "../../televisit/cards/MessageCard";

export class PatientTeleVisitTab extends React.Component {
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

    render() {
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
                            />
                        </ScreenLayout>
                    )}}
            </PatientProfileContext.Consumer>
        )
    }
}

const MessageList = (props) => {
    const newMessageItems = props.newMessages.map((message, index) => {
        return (
            <IncomingMessageCard
                key={`New_IncomingMessageCard_${message.id}`}
                message={message}
                index={index}
                isNew={true}
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

