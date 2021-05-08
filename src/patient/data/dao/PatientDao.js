import {rootDao} from "../../../root/data/dao/RootDao";
import {UserRole} from "../../../root/domain/Role";
import {DEFAULT_TIMEOUT} from "../../../root/data/server/util";
import {patientServerGateway} from "../server/PatientServerGateway";

export class PatientDao {

    constructor() {
    }

    async getUser() {
        let patient = await rootDao.getUser();
        if (patient.userInfo.role == UserRole.PATIENT) return patient;
        else return null;
    }

    getAllMessages = ({merge=true}={}) => {
        return patientServerGateway.getAllMessages({merge: merge});
    }

    getIncomingMessages = ({onlyNew=false, groupByNew=false}={}) => {
        return patientServerGateway.getIncomingMessages({onlyNew: onlyNew, groupByNew: groupByNew});
    }


    getOutgoingMessages = () => {
        return patientServerGateway.getOutgoingMessages();
    }

    sendMessageToPhysician = (patientMessage) => {
        return patientServerGateway.sendMessageToPhysician(patientMessage);
    }


    getPatientMedicalInfo = () => {
        return patientServerGateway.getPatientMedicalInfo();

    }

}

export const patientDao = new PatientDao();
