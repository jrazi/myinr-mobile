

export function removeWhiteSpace(str) {
    if (!(typeof str == 'string')) return str;
    return str.replace(/\s/g,'');
}
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
    if (locale == 'FA') return e2p(value.toString());
    else return value.toString();
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
