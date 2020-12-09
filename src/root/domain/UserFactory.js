import {UserRole} from "./Role";
import Patient from "./Patient";
import Doctor from "./Doctor";


export default class UserFactory {

    static createUser(userInfo) {
        return userInfo; // TODO Remove when safe
    }
}