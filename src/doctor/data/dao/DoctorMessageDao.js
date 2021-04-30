import {doctorService} from "../server/DoctorServiceGateway";

export class DoctorMessageDao {

    constructor() {
    }


    getTeleVisitSessionInfo = (messageId) => {
        return doctorService.getSingleIncomingMessage(messageId);
    }

    getPatientMedicalInfo = (patientUserId) => {
        return doctorService.getPatientMedicalInfo(patientUserId);
    }

    getIncomingMessagesFromPatient = (patientUserId) => {
        return doctorService.getIncomingMessages({groupByNew: true, patientUserId: patientUserId});
    }

    getIncomingMessages = ({onlyNew=false}={}) => {
        return doctorService.getIncomingMessages({onlyNew: onlyNew})
            .then(messages => messages);
    }

    getOutgoingMessages = () => {
        return doctorService.getOutgoingMessages()
            .then(messages => messages);
    }

    sendMessageToPatient = (patientUserId, message) => {
        return null;
    }
}

export const doctorMessageDao = new DoctorMessageDao();
