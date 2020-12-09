import {UserRole} from "./Role";
import Patient from "./Patient";
import Doctor from "./Doctor";


export default class UserFactory {

    static createUser(userInfo) {
        if (userInfo.role == UserRole.PATIENT)
            return Patient.ofDict(userInfo);
        else if (userInfo.role == UserRole.DOCTOR)
            return Doctor.ofDict(userInfo);
        else return null;
    }
}