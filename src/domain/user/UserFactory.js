import {UserRole} from "./Role";
import Patient from "./patient/Patient";
import Doctor from "./doctor/Doctor";


export default class UserFactory {

    static createUser(userInfo) {
        if (userInfo.role == UserRole.PATIENT)
            return new Patient(userInfo);
        else if (userInfo.role == UserRole.DOCTOR)
            return new Doctor(userInfo);
        else return null;
    }
}