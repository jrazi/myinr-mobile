import {UserRole} from "../../root/domain/Role";
import Doctor from "../../doctor/domain/Doctor";
import {removeWhiteSpace, translateGender} from "../../root/domain/Util";


export default class Patient {
    static ofDao(info) {
        let patient = {};
        patient.userId = normalize(info.IDUser);
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
        patient.role = UserRole.DOCTOR;
        patient.doctorInfo = {};
        return patient;
    }

    static ofDict(info) {
        let patient = new Patient();
        for (const key in info) {
            patient[key] = info[key];
        }
        return patient;
    }

}

const normalize = (field) => {
    return (field == undefined || removeWhiteSpace(field) == "") ? null : field;
}

const joinNames = (firstName, lastName) => {
    return firstName + ' ' + lastName;
}