import React from "react";
import {Portal, useTheme} from "react-native-paper";
import {View} from "react-native";
import DatePicker from "@mohamadkh75/react-native-jalali-datepicker";
import {firstNonEmpty, getFormFormattedJalaliDate} from "../../../../../../root/domain/util/Util";
import {ConditionalRender} from "./Layout";

export const DefaultDatePicker = (props) => {
    const theme = useTheme();
    return (
        <Portal>
            <ConditionalRender hidden={!props.visible}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <DatePicker
                    style={{
                        width: '80%',
                        height: '50%',
                        alignSelf: 'center',
                        backgroundColor: theme.colors.background,
                        borderWidth: 0.2,
                        borderColor: theme.colors.placeholder,
                        elevation: 4,
                    }}
                    selected={firstNonEmpty(props.selectedDate, getFormFormattedJalaliDate(new Date(Date.now())))}
                    dateSeparator='/'
                    minDate='1399/1/1'
                    maxDate='1399/12/29'
                    headerContainerStyle={{ height: '15%', flexDirection: 'row' }}
                    yearMonthBoxStyle={{
                        width: '30%',
                        height: '75%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 0,
                    }}
                    yearMonthTextStyle={{ fontSize: 24, color: theme.colors.primary, fontFamily: 'IranSans' }}
                    iconContainerStyle={{ width: `${100 / 7}%` }}
                    backIconStyle={{
                        width: 20,
                        height: 20,
                        resizeMode: 'center',
                        tintColor: theme.colors.placeholder,
                    }}
                    nextIconStyle={{
                        width: 20,
                        height: 20,
                        resizeMode: 'center',
                        tintColor: theme.colors.placeholder
                    }}
                    eachYearStyle={{
                        // width: 110,
                        height: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: theme.colors.background,
                        marginTop: '1.5%',
                        marginBottom: 5,
                        flexWrap: 'wrap',
                        flexGrow: 1,
                        alignSelf: 'center',
                        marginHorizontal: '1.5%',
                        // borderRadius: 10,
                        borderWidth: 0,
                        elevation: 0,
                    }}
                    eachYearTextStyle={{
                        fontSize: 16,
                        color: theme.colors.primary,
                        fontFamily: 'IranSans'
                    }}
                    eachMonthStyle={{
                        width: `${88 / 3}%`,
                        height: `${88 / 4}%`,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: theme.colors.background,
                        marginBottom: '3%',
                        // borderRadius: 10,
                        borderWidth: 0,
                        elevation: 0,
                    }}
                    eachMonthTextStyle={{ fontSize: 16, color: theme.colors.primary, fontFamily: 'IranSans' }}
                    weekdaysContainerStyle={{ height: '10%' }}
                    weekdayStyle={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomColor: theme.colors.placeholder,
                    }}
                    weekdayTextStyle={{
                        fontSize: 16,
                        color: theme.colors.primary,
                        marginBottom: 5,
                        fontFamily: 'IranSans'
                    }}
                    // borderColor={theme.colors.primary}
                    dayStyle={{
                        width: `${100 / 7}%`,
                        justifyContent: 'center',
                        alignItems: 'center',
                        aspectRatio: 1 / 1
                    }}
                    selectedDayStyle={{
                        width: '70%',
                        aspectRatio: 1 / 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 100,
                    }}
                    selectedDayColor={theme.colors.primary}
                    dayTextStyle={{ fontSize: 18, fontWeight: 'normal', fontFamily: 'IranSans', }}
                    selectedDayTextColor='white'
                    dayTextColor={theme.colors.text}
                    disabledTextColor={theme.colors.disabled}
                    onDateChange={props.onDateChange}
                />
            </View>
            </ConditionalRender>
        </Portal>
    )
}