import {useTheme} from "react-native-paper";
import {e2p, getFormattedJalaliDate} from "../../../../root/domain/util/Util";
import {InfoItem, Row} from "./DefaultCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import {getDateDifferenceDescribedByCalendarUnits} from "../../../../root/domain/util/DateUtil";

export const AppointmentInfoRows = (props) => {
    const theme = useTheme();
    let scheduledVisitDate = getFormattedJalaliDate(props.appointment.scheduledVisitDate.timestamp, 'DD MMMM YYYY');
    let scheduledVisitTime = props.appointment.scheduledVisitTime.asString || 'نامشخص';
    scheduledVisitTime = e2p(scheduledVisitTime);
    return ([
        <Row key={'first'}>
            <InfoItem
                title={scheduledVisitDate}
                wrapperStyle={{}}
                customIcon={<MaterialCommunityIcons name="calendar-range" size={20} color={theme.colors.placeholder}/>}
            />
            <InfoItem
                title={scheduledVisitTime}
                wrapperStyle={{}}
                customIcon={<MaterialCommunityIcons name="clock-outline" size={20} color={theme.colors.placeholder}/>}
            />
        </Row>,
    ]);
}