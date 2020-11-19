import {UserRole} from "../Role";


export default class Patient {

    constructor(info) {
        this.fullName = info.fullName;
        this.username = info.username;
        this.role = UserRole.PATIENT;
    }

    serialize() {
        return {
            fullName: this.fullName,
            username: this.username,
            role: this.role,
        }
    }
}