import {UserRole} from "../../root/domain/Role";

export default class Doctor {

    constructor() {
    }

    static ofDao(info) {
        let doctor = new Doctor();
        doctor.userId = normalize(info.IDUser);
        doctor.doctorId = normalize(info.IDPhysician);
        doctor.username = normalize(info.UsernameUser);
        doctor.fullName = joinNames(normalize(info.FNamePhysician), normalize(info.LNamePhysician));
        doctor.status = normalize(info.StatusUser);
        doctor.address = normalize(info.AddressPhysician);
        doctor.email = normalize(info.EmailPhysician);
        doctor.experise = normalize(info.ExpertisePhysician);
        doctor.nationalId = normalize(info.NIDPhysician);
        doctor.phone = normalize(info.PhonePhysician);
        doctor.role = UserRole.DOCTOR;
        return doctor;
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