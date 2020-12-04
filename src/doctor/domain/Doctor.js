import {UserRole} from "../../root/domain/Role";
import Patient from "../../patient/domain/Patient";

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
        doctor.expertise = normalize(info.ExpertisePhysician);
        doctor.nationalId = normalize(info.NIDPhysician);
        doctor.phone = normalize(info.PhonePhysician);
        doctor.patients = normalizeArray(normalize(info.patients));
        doctor.role = UserRole.DOCTOR;
        return doctor;
    }

    static ofDict(info) {
        console.log("HELOOOOOOOO")
        let doctor = new Doctor();
        for (const key in info) {
            doctor[key] = info[key];
        }
        // console.log('GOING TO CHECK', info.patients);
        if (Array.isArray(info.patients)) {
            // console.log('HERE SERIALIZING');
            doctor.patients = info.patients.map(patient => Patient.ofDict(patient));
            // console.log('HERE END', doctor);
        }
        console.log("END")
        return doctor;
    }

    serialize() {
        return {
            userId:   this.userId,
            doctorId:   this.doctorId,
            username:   this.username,
            fullName:   this.fullName,
            status:   this.status,
            address:   this.address,
            email:   this.email,
            expertise:   this.expertise,
            nationalId:   this.nationalId,
            phone:   this.phone,
            patients: this.patients.map(patient => patient.serialize()),
            role:   this.role,
        }
    }
}

const normalizeArray = (array) => Array.isArray(array) ? array : [];


const normalize = (field) => {
    return field == undefined ? null : field;
}

const joinNames = (firstName, lastName) => {
    return firstName + ' ' + lastName;
}