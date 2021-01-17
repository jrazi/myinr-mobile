import {hasValue, removeWhiteSpace} from "./Util";

const normalizeArray = (array) => Array.isArray(array) ? array : [];

export const firstOfList = (list) => {
    if (!hasValue(list)) return null;
    else if (!Array.isArray(list)) return list;
    for (const element of list) {
        if (hasValue(element)) return element;
    }
    return null;
}

export const normalize = (field) => {
    return (field == undefined || removeWhiteSpace(field) == '') ? null : field;
}

export const normalizeNumber = (field, defaultVal=0) => {
    field = normalizeNonList(field);
    let num = Number(normalize(field))
    return hasValue(num) && !isNaN(num) ? num : defaultVal;
}

export const normalizeNonList = (field) => {
    return firstOfList(normalize(field));
}

export const normalizeListAsString = (listStr, separator='-') => {
    let list = normalize(listStr);
    if (list == null) return [];
    return list.toString()
        .split(separator)
        .map(item => normalize(item));
}

export const normalizeStrangeListAsString = (listStr, separator='-', secondarySeparator=',') => {
    let list = normalize(listStr);
    if (list == null || removeWhiteSpace(list) == '') return [];
    list = list.split(secondarySeparator).join(separator);
    if (list[0] == separator) list = list.substr(1);
    if (list.length > 0 && list[list.length - 1] == separator) list = list.substr(list.length - 2);
    if (!hasValue(list) || !(list.length > 0)) return [];
    return list.toString()
        .split(separator)
        .map(item => normalize(item));
}

export const normalizeStrangeListOfNumbers = (listStr, separator='-', secondarySeparator=',') => {
    return normalizeStrangeListAsString(listStr, separator, secondarySeparator)
        .map(element => normalizeNumber(element));
}

export const normalizeBoolean = (field) => {
    field = normalizeNonList(field);
    if (!hasValue(field)) return false;
    if (field.toString() == 'false') return false;
    if (field.toString() == 'true') return true;
    return normalizeNumber(field) != 0;
}


export const joinNames = (firstName, lastName) => {
    return firstName + ' ' + lastName;
}

export const getBooleanMap = (keyArray, arrayOfTrues) => {
    const boolDict = {};
    for (const key of keyArray) {
        if (arrayOfTrues.includes(key))
            boolDict[key] = true;
        else boolDict[key] = false;
    }
    return boolDict;
}