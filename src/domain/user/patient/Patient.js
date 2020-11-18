import {UserRole} from "../Role";


export default class Patient {

    constructor(info) {
        this.fullName = info.fullName;
        this.role = UserRole.PATIENT;
    }

}