import {rootDao} from "../../../root/data/dao/RootDao";
import {UserRole} from "../../../root/domain/Role";

export class PatientDao {

    constructor() {
    }

    async getUser() {
        let patient = await rootDao.getUser();
        if (patient.role == UserRole.PATIENT) return patient;
        else return null;
    }

    async getUserMetaData() {
        let metadata = await rootDao.getUserMetaData();
        return metadata;
    }

    async saveUser(user) {
        return await rootDao.saveUser(user);
    }
}

export const patientDao = new PatientDao();
