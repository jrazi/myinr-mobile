import React, {useState} from "react";
import {ScreenLayout, TitleOnlyScreenHeader} from "../../../root/view/screen/Layout";
import {Surface, useTheme} from "react-native-paper";
import {ConditionalCollapsibleRender} from "../patients/visit/first/forms/Layout";
import {doctorDao} from "../../data/dao/DoctorDao";
import {doctorMessageDao} from "../../data/dao/DoctorMessageDao";
import {AppointmentCard} from "../visits/cards/AppointmentCard";
import {ItemListContainer} from "../../../root/view/list/ItemList";
import {IncomingMessageCard} from "./cards/MessageCard";

export default class TeleVisitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loadingMessages: true,
            displayingIncomingMessages: true,
            displayingOutgoingMessages: false,
            messagesToDisplay: [],
        }
    }

    componentDidMount() {
        this.loadMessages();
    }

    loadMessages =  () => {
        this.setState({loadingMessages: true}, async () => {
            const incomingMessages = await doctorMessageDao.getIncomingMessages({onlyNew: true});

            this.setState({
                messagesToDisplay: incomingMessages,
                loadingMessages: false,
            })
            // this.props.navigation.navigate(
            //     'TeleVisitSessionScreen',
            //     {
            //         userId: null,
            //         patientMessage: {},
            //         physicianMessage: {},
            //         readonly: false,
            //     },
            // );

        });
    }

    render() {
        return (
            <ScreenLayout>
                <ControlHeader
                />
                <MessageList
                    messages={this.state.messagesToDisplay}
                    refreshing={this.state.loadingMessages}
                    onRefresh={this.loadMessages}
                    navigation={this.props.navigation}
                />
            </ScreenLayout>
        );
    }
}

const ControlHeader = (props) => {
    const theme = useTheme();

    return (
        <Surface style={{elevation: 4}}>
            <TitleOnlyScreenHeader
                title="تله‌ویزیت"
                style={{elevation: 0}}
            />
            <ConditionalCollapsibleRender hidden={false}>
            </ConditionalCollapsibleRender>
        </Surface>
    )
}

const MessageList = (props) => {
    const messageItems = props.messages.map((message, index) => {
        return (
            <IncomingMessageCard
                key={`IncomingMessageCard_${message.id}`}
                message={message}
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

