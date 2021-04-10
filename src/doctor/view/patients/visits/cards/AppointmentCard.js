import {Button, Card, Surface, useTheme} from "react-native-paper";
import React from "react";
import {StyleSheet, View} from "react-native";
import {IntraSectionInvisibleDivider} from "../../visit/first/forms/Layout";
import {AppointmentInfoRows} from "../../../common/cards/Appointment";

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
                        <AppointmentInfoRows appointment={props.appointment}/>
                    </View>
                </Card.Content>
                <IntraSectionInvisibleDivider none borderWidth={0.1} style={{marginHorizontal: 20, marginTop: 10,}}/>
            </View>
        </CardContainer>
    );
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
    },

    appointmentCardContainer: {},
    appointmentCard: {},
});
