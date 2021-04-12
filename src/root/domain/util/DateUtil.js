import {e2p, hasValue} from "./Util";
import * as jd from 'jalali-date';
let moment = require('moment');
require('moment-precise-range-plugin');
require('moment-timezone');

export function isDateWithinToday(date) {
    if (!hasValue(date)) return false;

    const today = moment.tz('Asia/Tehran').startOf('day').utc();
    const toCompareDate = moment(date).tz('Asia/Tehran').startOf('day').utc();
    return moment(today).isSame(toCompareDate);
}

export function isDateWithinThisWeek(date) {
    if (!hasValue(date)) return false;

    const now = moment.tz('Asia/Tehran').startOf('day').utc().unix();
    const toCompareDate = moment(date).tz('Asia/Tehran').startOf('day').utc().unix();

    const diff = toCompareDate - now;
    if (diff < 0 || diff > 7*24*3600) {
        return false;
    }

    const nowJDate = new jd.default(new Date(now*1000));
    const toCompareJDate = new jd.default(new Date(toCompareDate*1000));

    const nowDayOfWeek = (nowJDate.getDay() + 1) % 7;
    const toCompareDayOfWeek = (toCompareJDate.getDay() + 1) % 7;

    return nowDayOfWeek <= toCompareDayOfWeek;
}

export function isDateWithinThisMonth(date) {
    if (!hasValue(date)) return false;

    const now = moment.tz('Asia/Tehran').startOf('day').utc().unix();
    const toCompareDate = moment(date).tz('Asia/Tehran').startOf('day').utc().unix();


    const diff = toCompareDate - now;
    if (diff < 0 || diff > 31*24*3600) {
        return false;
    }

    const nowJDate = new jd.default(new Date(now*1000));
    const toCompareJDate = new jd.default(new Date(toCompareDate*1000));

    return nowJDate.getMonth() == toCompareJDate.getMonth();
}

export function getDateDifferenceDescribedInFarsi(start, end, appendDifferenceIndicatorWord=false) {
    const diff = getDateDifferenceDescribedByCalendarUnits(start, end);
    const dateElement = [
        {
            key: "years",
            name: "سال",
            value: diff.years,
        },
        {
            key: "months",
            name: "ماه",
            value: diff.months,
        },
        {
            key: "days",
            name: "روز",
            value: diff.days,
        },
    ];

    let dateElementsWithValue = dateElement
        .filter(element => Number(element.value) > 0);


    if (dateElementsWithValue.length == 0) {
        return 'امروز';
    }

    let dateInFarsi = dateElementsWithValue
        .reduce((dateStr, element) => dateStr + e2p(element.value.toString()) + ' ' + element.name + ' ' + 'و' + ' ', "")

    dateInFarsi = dateInFarsi.length > 2 ? dateInFarsi.substring(0, dateInFarsi.length - 3) : dateInFarsi;

    if (appendDifferenceIndicatorWord)
        dateInFarsi += ' ' + (diff.firstDateWasLater ? 'قبل' : 'بعد');

    return dateInFarsi;
}

export function getDateDifferenceDescribedByCalendarUnits(start, end) {
    const startMoment = moment(start || 0);
    const endMoment = moment(end || 0);

    const diff = moment.preciseDiff(startMoment, endMoment, true);

    return diff;
}

export function getDateDifferenceInTimestamp(d1, d2) {
    return (new Date(d1).getTime() || 0) - (new Date(d2).getTime() || 0);
}
//
// iff is "-PT244H38M31.449S" Object {
//     "days": 10,
//         "firstDateWasLater": false,
//         "hours": 4,
//         "minutes": 38,
//         "months": 0,
//         "seconds": 32,
//         "years": 0,
// } "2021-04-10T14:51:28.551Z" "2021-04-20T19:30:00.000Z"
// diff is "-