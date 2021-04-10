import {e2p, hasValue} from "./Util";

export function getDisplayableFarsiValue(value, alternative='نامشخص') {
    return e2p(getDisplayableValue(value, alternative));
}

export function getDisplayableValue(value, alternative='نامشخص') {
    if (!hasValue(value)) return alternative;
    if ((typeof value == 'string') && value.trim() == '')
        return alternative;
    if ( typeof value == 'object' )
        return alternative;
    return new String(value).toString();
}