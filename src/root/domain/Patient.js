import {UserRole} from "./Role";
import {firstNonEmpty, removeWhiteSpace, translateGender} from "./util/Util";


export default class Patient {
    static ofDao(info) {
        let patient = {};
        patient.userId = normalize(firstNonEmpty(info.IDUser, info.IDUserPatient));
        patient.patientId = normalize(info.IDPatient);
        patient.username = normalize(info.UsernameUser);
        patient.fullName = joinNames(normalize(info.FNamePatient), normalize(info.LNamePatient));
        patient.fatherName = normalize(info.FatherName);
        patient.status = normalize(info.StatusUser);
        patient.birthDate = normalize(info.BirthDatePatient);
        patient.birthPlace = normalize(info.BirthPlace);
        patient.medicalCondition = normalize(info.CausePatient);
        patient.gender = normalize(info.Gender);
        patient.email = normalize(info.EmailPatient);
        patient.nationalId = normalize(info.NIDPatient);
        patient.phone = normalize(info.PhonePatient);
        patient.mobile = normalize(info.Mobile);
        patient.emergencyPhone = normalize(info.EssentialPhone);
        patient.latestINR = {
            testId: normalize(info.IDINR),
            testDate: normalize(info.DateofINRTest),
            testTime: normalize(info.TimeofINRTest),
            testResult: normalize(info.NewINR),
        }
        patient.role = UserRole.PATIENT;
        patient.doctorInfo = {};
        return patient;
    }
}

const normalize = (field) => {
    return (field == undefined || removeWhiteSpace(field.toString()) == "") ? null : field;
}

const joinNames = (firstName, lastName) => {
    return firstName + ' ' + lastName;
}