import {Button, Card, Surface, Text, useTheme} from "react-native-paper";
import {
    getFormattedJalaliDate,
    hasValue,
    howMuchTimePast,
} from "../../../../../root/domain/util/Util";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import {StyleSheet, View} from "react-native";
import {IntraSectionInvisibleDivider} from "../../visit/first/forms/Layout";

export const AttendedVisitInfoCard = (props) => {
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
    let timePastVisit = '';
    if (hasValue(props.visitInfo.visitDate) && hasValue(props.visitInfo.visitDate.jalali.asString || null)) {
        timePastVisit = howMuchTimePast(props.visitInfo.visitDate.jalali.asString);
    }


    return (
        <CardContainer index={props.index}
                       style={[{
                           // elevation: 4,
                       }, styles.visitInfoCardContainer]}
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
                        title={timePastVisit}
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
                            color={theme.colors.actionColors.primary}
                            compact mode="contained"
                            onPress={() => props.viewVisitInfo(props.index)}
                            labelStyle={{fontSize: 12}}
                        >
                            {'مرور ویزیت'}
                        </Button>
                    </View>

                </View>
                <Card.Content>
                    <View>
                        <AttendedVisitCardDetails visitInfo={props.visitInfo}/>
                    </View>
                </Card.Content>
                <IntraSectionInvisibleDivider none borderWidth={0.1} style={{marginHorizontal: 20, marginTop: 10,}}/>
            </View>
        </CardContainer>
    );
}
const AttendedVisitCardDetails = (props) => {
    const theme = useTheme();
    let visitDate = '';
    if (hasValue(props.visitInfo.visitDate) && hasValue(props.visitInfo.visitDate.timestamp || null)) {
        visitDate = getFormattedJalaliDate(props.visitInfo.visitDate.timestamp, 'dddd DD MMMM YYYY');
    }

    return ([
        <Row key={'first'}>
            <InfoItem
                title={visitDate}
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

    fab: {
        position: 'absolute',
        margin: 24,
        left: 0,
        bottom: 0,
    },

    visitListContainer: {

    },
    visitInfoCardContainer: {
    },
    visitInfoCard: {
    },
    visitCardDetails: {
    }
});
