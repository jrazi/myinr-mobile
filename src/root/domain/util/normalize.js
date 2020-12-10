import {removeWhiteSpace} from "./Util";

const normalizeArray = (array) => Array.isArray(array) ? array : [];

export const normalize = (field) => {
    return (field == undefined || removeWhiteSpace(field) == '') ? null : field;
}
export const joinNames = (firstName, lastName) => {
    return firstName + ' ' + lastName;
}