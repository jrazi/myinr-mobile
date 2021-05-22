

export function getLastNameAndTitle(physician) {
    return !(physician || {}).lastName ? null : ('دکتر' + ' ' + physician.lastName);
}