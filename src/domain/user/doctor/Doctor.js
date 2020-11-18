import {UserRole} from "../Role";


export default class Doctor {

    constructor(info) {
        this.fullName = info.fullName;
        this.role = UserRole.DOCTOR;
    }

}