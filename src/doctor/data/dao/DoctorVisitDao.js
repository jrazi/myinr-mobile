import {doctorService} from "../server/DoctorServiceGateway";


export class DoctorVisitDao {

    constructor() {
    }


    getFollowupVisits = (patientUserId) => {
        return doctorService.getFollowupVisits(patientUserId)
            .then(visits => visits);
    }

    getAppointments = (patientUserId) => {
        return doctorService.getAppointments(patientUserId)
            .then(appointments => appointments);
    }

}

export const doctorVisitDao = new DoctorVisitDao();
