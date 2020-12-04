import {UserRole} from "../../root/domain/Role";
import Doctor from "../../doctor/domain/Doctor";
import {translateGender} from "../../root/domain/Util";


export default class Patient {

    constructor() {
    }

    static ofDao(info) {
        let patient = new Patient();
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
        patient.emergencyPhone = normalize(info.EssentialPhone);
        patient.role = UserRole.DOCTOR;
        patient.doctorInfo = Doctor.ofDao(info);
        return patient;
    }

    static ofDict(info) {
        let patient = new Patient();
        for (const key in info) {
            patient[key] = info[key];
        }
        if (info.doctorInfo != undefined && info.doctorInfo != null) {
            patient.doctorInfo = Doctor.ofDao(info.doctorInfo);
        }
        console.log('serialized some patient', info, patient);
        return patient;
    }

    serialize(locale='EN') {
        if (locale == 'FA') return this.serializeFarsi();
        return {
            userId: this.userId,
            patientId: this.patientId,
            username: this.username,
            fullName: this.fullName,
            fatherName: this.fatherName,
            status: this.status,
            birthDate: this.birthDate,
            birthPlace: this.birthPlace,
            medicalCondition: this.medicalCondition,
            gender: this.gender,
            email: this.email,
            nationalId: this.nationalId,
            phone: this.phone,
            emergencyPhone: this.emergencyPhone,
            role: this.role,
            doctorInfo: this.doctorInfo.serialize(),
        }
    }

    serializeFarsi() {
        return {
            userId: this.userId,
            patientId: this.patientId,
            username: this.username,
            fullName: this.fullName,
            fatherName: this.fatherName,
            status: this.status,
            birthDate: this.birthDate,
            birthPlace: this.birthPlace,
            medicalCondition: this.medicalCondition,
            gender: translateGender(this.gender, 'FA'),
            email: this.email,
            nationalId: this.nationalId,
            phone: this.phone,
            emergencyPhone: this.emergencyPhone,
            role: this.role,
            doctorInfo: this.doctorInfo.serialize(),
        }
    }
}

const normalize = (field) => {
    return field == undefined ? null : field;
}

const joinNames = (firstName, lastName) => {
    return firstName + ' ' + lastName;
}