import {Button, Card, Surface, useTheme} from "react-native-paper";
import React from "react";
import {StyleSheet, View} from "react-native";
import {IntraSectionInvisibleDivider} from "../../patients/visit/first/forms/Layout";
import {e2p, firstNonEmpty, getFormattedJalaliDate} from "../../../../root/domain/util/Util";
import {InfoItem, Row} from "../../common/cards/DefaultCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const IncomingMessageCard = (props) => {
    const theme = useTheme();

    const CardContainer = ({index, style, ...props}) => {
        if (index % 2 == 0) {
            return <View style={[{}, style]}>
                {props.children}
            </View>
        } else return <Surface style={[{elevation: 0,}, style]}>
            {props.children}
        </Surface>
    }

    return (
        <CardContainer index={props.index}
                       style={[{
                           // elevation: 4,
                       }, styles.cardContainer]}
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
                        title={props.message.patientInfo.fullName}
                        subtitle={''}
                        style={{
                            flexGrow: 0,
                            width: '50%',
                        }}
                    />

                    <View
                        style={{
                            paddingHorizontal: 20,
                        }}
                    >
                        <MessageCardButton isNew={firstNonEmpty(props.isNew, true)} navigation={props.navigation} messageId={props.message.id}/>
                    </View>

                </View>
                <Card.Content>
                    <View>
                        <MessageInfoRows message={props.message}/>
                    </View>
                </Card.Content>
                <IntraSectionInvisibleDivider none borderWidth={0.1} style={{marginHorizontal: 20, marginTop: 10,}}/>
            </View>
        </CardContainer>
    );
}

export const MessageInfoRows = (props) => {
    const theme = useTheme();
    let messageDate = getFormattedJalaliDate(props.message.messageDate.timestamp, 'DD MMMM YYYY');
    let messageTime = props.message.messageTime.asString || 'نامشخص';
    messageTime = e2p(messageTime);

    let patientComment = props.message.patientComment || "بدون توضیحات";

    return ([
        <Row key={'comment_row'}>
            <InfoItem
                title={patientComment}
                wrapperStyle={{
                    width: '100%',
                }}
                textProps={{
                    numberOfLines: 1,
                    // ellipsizeMode: 'clip',
                }}
                // customIcon={<MaterialCommunityIcons name="calendar-range" size={20} color={theme.colors.placeholder}/>}
            />
        </Row>,
        <Row key={'date_row'}>
            <InfoItem
                title={messageDate}
                wrapperStyle={{}}
                customIcon={<MaterialCommunityIcons name="calendar-range" size={20} color={theme.colors.placeholder}/>}
            />
            <InfoItem
                title={messageTime}
                wrapperStyle={{}}
                customIcon={<MaterialCommunityIcons name="clock-outline" size={20} color={theme.colors.placeholder}/>}
            />
        </Row>,
    ]);
}

export const MessageCardButton = (props) => {
    const theme = useTheme();

    const navigateToTeleVisit = () => {
        props.navigation.navigate(
            'TeleVisitSessionScreen',
            {
                userId: null,
                messageId: props.messageId,
                readonly: props.isNew === false,
            },
        );
    }

    if (props.isNew) {
        return (
            <Button
                color={theme.colors.actionColors.secondary}
                compact
                mode="contained"
                onPress={() => navigateToTeleVisit()}
                labelStyle={{fontSize: 13}}
                contentStyle={{
                    // width: 70,
                }}
            >
                {'تله‌ویزیت'}
            </Button>
        )
    }
    else return (
        <Button
            color={theme.colors.actionColors.primary}
            compact
            mode="contained"
            onPress={() => navigateToTeleVisit()}
            labelStyle={{fontSize: 13}}
            contentStyle={{
                // width: 70,
            }}
        >
            {'مشاهده'}
        </Button>
    )
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
    },

    cardContainer: {},
});
