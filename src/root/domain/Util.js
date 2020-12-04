

export function calcAge(birthDate) {
    return 10;
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