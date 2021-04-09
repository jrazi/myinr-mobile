import {hasValue} from "./Util";
import * as jd from 'jalali-date';


export function isDateWithinToday(date) {
    if (!hasValue(date)) return false;

    const now = new Date();
    const toCompareDate = new Date(date);

    now.setUTCHours(0, 0, 0, 0);
    toCompareDate.setUTCHours(0, 0, 0, 0);

    return (now >= toCompareDate) && (now <= toCompareDate);
}

export function isDateWithinThisWeek(date) {
    if (!hasValue(date)) return false;

    const now = new Date();
    const toCompareDate = new Date(date);

    now.setUTCHours(0, 0, 0, 0);
    toCompareDate.setUTCHours(0, 0, 0, 0);

    const diff = toCompareDate - now;
    if (diff < 0 || diff > 7*24*3600*1000) {
        return false;
    }

    const nowJDate = new jd.default(now);
    const toCompareJDate = new jd.default(toCompareDate);

    return nowJDate.getDay() <= toCompareJDate.getDay();
}

export function isDateWithinThisMonth(date) {
    if (!hasValue(date)) return false;

    const now = new Date();
    const toCompareDate = new Date(date);

    now.setUTCHours(0, 0, 0, 0);
    toCompareDate.setUTCHours(0, 0, 0, 0);

    const diff = toCompareDate - now;
    if (diff < 0 || diff > 31*24*3600*1000) {
        return false;
    }

    const nowJDate = new jd.default(now);
    const toCompareJDate = new jd.default(toCompareDate);

    return nowJDate.getMonth() == toCompareJDate.getMonth();
}