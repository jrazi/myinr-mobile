
import * as jd from 'jalali-date';

export const noop = (...params) => {};

export function guessGender(info) {
    if (hasValue(info.gender)) return info.gender;
    for (const female of FEMALE_NAMES) {
        if (hasValue(info.fullName) && info.fullName.includes(female))
            return 'F';
    }
    return 'M';
}

export function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds*1000));
}

export function removeWhiteSpace(str) {
    if (!(typeof str == 'string')) return str;
    return str.replace(/\s/g,'');
}

export function howMuchTimePast(oldDate) {
    const str = jalaliTimePastInFarsi(oldDate);

    if ((str == 'امروز' ) || str.length < 5) return str;

    return str + ' ' + 'قبل';
}


export function jalaliTimePastInFarsi(oldDate) {
    let timePast = jalaliTimePast(oldDate);
    if (!hasValue(timePast) || timePast.length != 3) return null;
    return timePastInFarsi(timePast[0], timePast[1], timePast[2]);
}

export function timePastInFarsi(year, month, day) {
    let omitDay = false;
    let omitMonth = false;
    let omitYear = false;

    year = Number(year);
    month = Number(month);
    day = Number(day);

    if (year == 0 && month == 0 && day == 0) return 'امروز';

    if (year >= 1 || day == 0 || month >= 3) omitDay = true;
    if (year >= 3 || month == 0) omitMonth = true;
    if (year == 0) omitYear = true;

    let tp = '';
    let parts = [];
    if (!omitYear) parts.push(year + ' سال');
    if (!omitMonth) parts.push(month + ' ماه');
    if (!omitDay) parts.push(day + ' روز');

    for (const part of parts) {
        tp += part + ' و ';
    }
    if (parts.length > 0) tp = tp.slice(0, -3);
    return e2p(tp);
}

export function jalaliTimePast(oldDate) {
    if (!hasValue(oldDate)) return null;
    oldDate = jalaliToGeorgian(oldDate);

    return calcTimePast(oldDate);
}

export function calcTimePast(oldDate, referenceDate=null) {
    if (!hasValue(oldDate)) return null;
    const now = referenceDate ? referenceDate : new Date();
    let diff = new Date(
        now.getFullYear()-oldDate.getFullYear(),
        now.getMonth()-oldDate.getMonth(),
        now.getDate()-oldDate.getDate()
    );
    return [diff.getYear(), diff.getMonth(), diff.getDate()];
}

export function calcAge(birthDate) {
    if (!hasValue(birthDate)) return null;
    return calculateAge(jalaliToGeorgian(birthDate));
}

export function hasValue(data) {
    return data != undefined && data != null;
}

function calculateAge(birthday) {
    if (!hasValue(birthday)) return null;
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function translateGender(genderLetter, locale='EN') {
    switch (genderLetter) {
        case 'M':
            return locale == 'EN' ? 'Male' : 'مرد';
        case 'F':
            return locale == 'EN' ? 'Female' : 'زن';
        default:
            return locale == 'EN' ? 'N/A' : 'نامشخص';
    }
}

export function normalizeDictForDisplay(dict, locale='EN') {
    let normalizedDict = {};
    for (const key in dict) {
        normalizedDict[key] = normalizeValueForDisplay(dict[key], locale);
    }
    return normalizedDict;
}

export function normalizeValueForDisplay(value, locale='EN') {
    let na = locale == 'FA' ? 'نامشخص' : 'N/A';
    if (value == null || value == undefined) return na;
    if (typeof value == 'object') return value;
    if (locale == 'FA') return e2p(value.toString());
    return value.toString();
}


export function toPersianNumbers(str) {
    const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    const arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
    if(typeof str === 'string')
    {
        for(var i=0; i<10; i++)
        {
            str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
    }
    return str;
};

export const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
export const e2a = s => s.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])

export const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
export const a2e = s => s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))

export const p2a = s => s.replace(/[۰-۹]/g, d => '٠١٢٣٤٥٦٧٨٩'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)])
export const a2p = s => s.replace(/[٠-٩]/g, d => '۰۱۲۳۴۵۶۷۸۹'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)])


export function jalaliYMDToGeorgian(year, month, day) {
    if (!hasValue(year) || !hasValue(month) || !hasValue(day)) return null;
    let dateStr = (hasValue(year) ? (year.toString() + '/') : '')
        + (hasValue(month) ? (month.toString() + '/') : '')
        + (hasValue(day) ? (day.toString() + '/') : '');
    dateStr = hasValue(year) ? dateStr : null;
    const georgianDate = jalaliToGeorgian(dateStr);
    if (Number.isNaN(georgianDate.getDate())) return null;
    return georgianDate;
}

export function jalaliToGeorgian(jalaliDate) {
    jalaliDate = removeWhiteSpace(firstNonEmpty(jalaliDate, '')).toString();
    if (jalaliDate == null || jalaliDate == '') return null;
    jalaliDate = p2e(a2e(jalaliDate));
    let parts = [];
    if (jalaliDate.includes('/'))
        parts = jalaliDate.split('/');
    else if (jalaliDate.includes('-'))
        parts = jalaliDate.split('-');
    else if (jalaliDate.includes(','))
        parts = jalaliDate.split(',');
    else if (!Number.isNaN(jalaliDate)) parts[0] = jalaliDate;

    if (parts.length < 1) return null;
    if (!hasValue(parts[1])) parts[1] = '0';
    if (!hasValue(parts[2])) parts[2] = '0';
    return _jalaliToGeorgian(parts[0], parts[1], parts[2]);
}

function _jalaliToGeorgian(year, month, day) {
    const jDate = new jd.default();
    jDate.setFullYear(year);
    jDate.setMonth(month);
    jDate.setDate(day);
    return jDate.toGregorian();
}


const FEMALE_NAMES = ['پرستو', 'مهدیه']

// Return the first object that is not null or undefined
export function firstNonEmpty(...values) {
    for (const value of values) {
        if (hasValue(value)) return value;
    }
    return null;
}

export function getJalaliDateInDisplayableFormat({year=null, month=null, day=null}) {

    if (!(year && month) && !(month && day)) {
        return "";
    }
    let customFormat = `${((year && month && day) || '') && 'dddd'} ${(day || '') && 'DD'} ${(month || '') && 'MMMM'} ${(year || '') && 'YYYY'}`.trim();
    year = (year || "").toString() || "00";
    month = (month || "").toString() || "00";
    day = (day || "").toString() || "00";


    let date = jalaliYMDToGeorgian(year, month, day);


    if (!hasValue(date) || !hasValue(date.getFullYear) )
        return "";

    const jDate = new jd.default(date);
    const dateStr = jDate.format(customFormat);
    return e2p(dateStr);
}


export function getFormattedJalaliDate(date, customFormat='dddd DD MMMM') {
    if (!hasValue(date || null)) return null;
    date = new Date(date);
    if (date.toString() == 'Invalid Date' || !hasValue(date.getFullYear)) return null;

    const jDate = new jd.default(date);
    const dateStr = jDate.format(customFormat);
    return e2p(dateStr);
}

export function getFormattedJalaliDateTime(date) {
    if (!hasValue(date || null)) return null;
    date = new Date(date);
    if (date.toString() == 'Invalid Date' || !hasValue(date.getFullYear)) return null;

    let dateTime = getFormattedJalaliDate(date, 'dddd DD MMMM YYYY');
    let hasTime = !(date.getHours() == 0 && date.getMinutes() == 0 && date.getSeconds() == 0)
    let time = !hasTime ? '' : (date.getHours() % 12 || 12) + ':' + date.getMinutes() + ' ' + (date.getHours() < 12 ? 'ق.ظ' : 'ب.ظ') + ' ';
    dateTime = time + dateTime;
    return e2p(dateTime);
}


export function getFormFormattedJalaliDate(date) {
    if (!hasValue(date)) date = new Date(Date.now());
    const jDate = new jd.default(date);
    const dateStr = jDate.format('YYYY/MM/DD');
    return dateStr;
}


export function getDayOfWeekName(dayNum) {
    dayNum = dayNum + 1;
    const daysOfWeek = {
        0: 'saturday',
        1: 'sunday',
        2: 'monday',
        3: 'tuesday',
        4: 'wednesday',
        5: 'thursday',
        6: 'friday',
    }
    if (!hasValue(dayNum)) return null;
    return daysOfWeek[dayNum % 7];
}