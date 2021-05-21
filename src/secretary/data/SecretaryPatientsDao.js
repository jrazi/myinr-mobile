
import {secretaryServerGateway} from "./SecretaryServerGateway";


export class SecretaryPatientsDao {

    constructor() {
    }

    getAllPatients = () => {
        return secretaryServerGateway.getAllPatients();
    }

    getPatient = (patientUserId) => {
        return secretaryServerGateway.getPatient(patientUserId);
    }


    addPatient = (patientInfo) => {
        return secretaryServerGateway.upsertPatient(patientInfo);

    }

    updatePatient = (patientUserId, patientInfo) => {
        patientInfo.userId = patientUserId || patientInfo.userId;

        return secretaryServerGateway.upsertPatient(patientInfo);
    }

}

export const secretaryPatientsDao = new SecretaryPatientsDao();
