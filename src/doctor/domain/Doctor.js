import {UserRole} from "../../root/domain/Role";
import Patient from "../../patient/domain/Patient";
import {removeWhiteSpace} from "../../root/domain/Util";

export default class Doctor {

    static ofDao(info) {
        let doctor = {};
        doctor.userId = normalize(info.IDUser);
        doctor.doctorId = normalize(info.IDPhysician);
        doctor.username = normalize(info.UsernameUser);
        doctor.fullName = joinNames(normalize(info.FNamePhysician), normalize(info.LNamePhysician));
        doctor.status = normalize(info.StatusUser);
        doctor.address = normalize(info.AddressPhysician);
        doctor.email = normalize(info.EmailPhysician);
        doctor.expertise = normalize(info.ExpertisePhysician);
        doctor.nationalId = normalize(info.NIDPhysician);
        doctor.phone = normalize(info.PhonePhysician);
        doctor.patients = [];
        doctor.role = UserRole.DOCTOR;
        return doctor;
    }

    static ofDict(info) {
        let doctor = new Doctor();
        for (const key in info) {
            doctor[key] = info[key];
        }
        return doctor;
    }
}

const normalizeArray = (array) => Array.isArray(array) ? array : [];


const normalize = (field) => {
    return (field == undefined || removeWhiteSpace(field) == '') ? null : field;
}

const joinNames = (firstName, lastName) => {
    return firstName + ' ' + lastName;
}