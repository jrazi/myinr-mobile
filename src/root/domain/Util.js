
import * as jd from 'jalali-date';


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

export function calcTimePast(oldDate) {
    if (!hasValue(oldDate)) return null;
    const now = new Date();
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


export function jalaliToGeorgian(jalaliDate) {
    jalaliDate = removeWhiteSpace(jalaliDate).toString();
    if (jalaliDate == null || jalaliDate == '') return null;
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