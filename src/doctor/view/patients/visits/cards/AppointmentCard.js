import {Button, Card, Surface, Text, useTheme} from "react-native-paper";
import {getFormattedJalaliDate, hasValue, jalaliTimePastInFarsi} from "../../../../../root/domain/util/Util";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import {StyleSheet, View} from "react-native";
import {IntraSectionInvisibleDivider} from "../../visit/first/forms/Layout";

export const AppointmentCard = (props) => {
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
                       }, styles.appointmentCardContainer]}
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
                        title={props.appointment.patient.fullName}
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
                        <Button
                            color={theme.colors.actionColors.secondary}
                            compact
                            mode="contained"
                            onPress={() => props.attendAnAppointment(props.index)}
                            labelStyle={{fontSize: 12}}
                        >
                            {'انجام ویزیت'}
                        </Button>
                    </View>

                </View>
                <Card.Content>
                    <View>
                        <AppointmentCardDetails appointment={props.appointment}/>
                    </View>
                </Card.Content>
                <IntraSectionInvisibleDivider none borderWidth={0.1} style={{marginHorizontal: 20, marginTop: 10,}}/>
            </View>
        </CardContainer>
    );
}
const AppointmentCardDetails = (props) => {
    const theme = useTheme();
    let scheduledVisitDate = '';
    if (hasValue(props.appointment.scheduledVisitDate) && hasValue(props.appointment.scheduledVisitDate.timestamp || null)) {
        scheduledVisitDate = getFormattedJalaliDate(props.appointment.scheduledVisitDate.timestamp, 'dddd DD MMMM YYYY');
    }

    return ([
        <Row key={'first'}>
            <InfoItem
                title={scheduledVisitDate}
                wrapperStyle={{
                    flexBasis: '100%',
                }}
                customIcon={<MaterialCommunityIcons name="calendar-range" size={20} color={theme.colors.placeholder}/>}
            />
        </Row>,
    ]);
}
const InfoItem = (props) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexBasis: '50%',
                ...props.wrapperStyle
            }}
        >
            <View
                style={{
                    paddingHorizontal: 4,
                }}
            >
                {props.customIcon}
            </View>
            <View
                style={{
                    paddingHorizontal: 4,
                }}
            >
                <Text>{props.title}</Text>
            </View>
        </View>
    )
}
const Row = (props) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 10,
            }}
        >
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
    },

    appointmentCardContainer: {
    },
    appointmentCard: {
    },
});
