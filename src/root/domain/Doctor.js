import {UserRole} from "./Role";
import {joinNames, normalize} from "./util/normalize";

export default class Doctor {

    static ofDao(info) {
        let doctor = {};
        doctor.userId = normalize(info.IDUser);
        doctor.physicianId = normalize(info.IDPhysician);
        doctor.username = normalize(info.UsernameUser);
        doctor.fullName = joinNames(normalize(info.FNamePhysician), normalize(info.LNamePhysician));
        doctor.status = normalize(info.StatusUser);
        doctor.address = normalize(info.AddressPhysician);
        doctor.email = normalize(info.EmailPhysician);
        doctor.expertise = normalize(info.ExpertisePhysician);
        doctor.nationalId = normalize(info.NIDPhysician);
        doctor.phone = normalize(info.PhonePhysician);
        doctor.patients = [];
        doctor.workPlaces = [];
        doctor.role = UserRole.DOCTOR;
        return doctor;
    }
}


