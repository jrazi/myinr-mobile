import React from "react";
import {ScreenLayout, TitleOnlyScreenHeader} from "../../root/view/screen/Layout";
import {Surface, useTheme} from "react-native-paper";
import {ConditionalCollapsibleRender} from "../../doctor/view/patients/visit/first/forms/Layout";
import {IncomingMessageCard} from "../../doctor/view/televisit/cards/MessageCard";
import {ItemListContainer} from "../../root/view/list/ItemList";
import {patientDao} from "../data/dao/PatientDao";

export default class MessageListScreen extends React.Component {
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
            const incomingMessages = await patientDao.getIncomingMessages();
            incomingMessages.forEach(m => m.patientInfo = {fullName: 'something', patientUserId: 'other thing'});
            this.setState({
                messagesToDisplay: incomingMessages,
                loadingMessages: false,
            })

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
                title="پیام‌ها"
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
