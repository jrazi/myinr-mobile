import {UserRole} from "../../root/domain/Role";
import Doctor from "../../doctor/domain/Doctor";


export default class Patient {

    constructor() {
    }

    static ofDao(info) {
        let patient = new Patient();
        patient.userId = normalize(info.IDUser);
        patient.patientId = normalize(info.IDPhysician);
        patient.username = normalize(info.UsernameUser);
        patient.fullName = joinNames(normalize(info.FNamePatient), normalize(info.LNamePatient));
        patient.fatherName = normalize(info.FatherName);
        patient.status = normalize(info.StatusUser);
        patient.birthDate = normalize(info.BirthDatePatient);
        patient.birthPlace = normalize(info.BirthPlace);
        patient.medicalCondition = normalize(info.CausePatient);
        patient.gender = normalize(info.Gender);
        patient.email = normalize(info.EmailPhysician);
        patient.experise = normalize(info.ExpertisePhysician);
        patient.nationalId = normalize(info.NIDPatient);
        patient.phone = normalize(info.PhonePatient);
        patient.emergencyPhone = normalize(info.EssentialPhone);
        patient.role = UserRole.DOCTOR;
        patient.doctorInfo = Doctor.ofDao(info);
        return patient;
    }

    serialize() {
        return {
            fullName: this.fullName,
            username: this.username,
            role: this.role,
        }
    }
}

const normalize = (field) => {
    return field == undefined ? null : field;
}

const joinNames = (firstName, lastName) => {
    return firstName + ' ' + lastName;
}