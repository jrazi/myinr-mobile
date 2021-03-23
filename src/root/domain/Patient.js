import {UserRole} from "./Role";
import {firstNonEmpty, hasValue, removeWhiteSpace, translateGender} from "./util/Util";


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
        patient.visited = Number(normalize(info.visitCount)) > 0;
        patient.visitCount = Number(normalize(info.visitCount));
        patient.role = UserRole.PATIENT;
        patient.doctorInfo = {};
        return patient;
    }

    static hasMedicalCondition(patient, conditionName) {
        if (!hasValue(patient) || !hasValue(patient.medicalCondition) || !hasValue(patient.medicalCondition.length))
            return false;
        return patient.medicalCondition.some(condition => condition.name == conditionName);
    }

    static getMedicalConditionsListAsString(patient) {
        if (!hasValue(patient) || !hasValue(patient.medicalCondition) || !hasValue(patient.medicalCondition.length))
            return "";
        const conditionsAsString = patient.medicalCondition.reduce((acc, current) => `${acc}-${current.name}`, "");
        return conditionsAsString.substring(1);
    }
}

const normalize = (field) => {
    return (field == undefined || removeWhiteSpace(field.toString()) == "") ? null : field;
}

const joinNames = (firstName, lastName) => {
    return firstName + ' ' + lastName;
}