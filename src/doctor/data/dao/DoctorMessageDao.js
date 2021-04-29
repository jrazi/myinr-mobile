import {doctorService} from "../server/DoctorServiceGateway";

export class DoctorMessageDao {

    constructor() {
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


}

export const doctorMessageDao = new DoctorMessageDao();
