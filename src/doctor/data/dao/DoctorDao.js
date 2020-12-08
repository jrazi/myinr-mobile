import {rootDao} from "../../../root/data/dao/RootDao";
import {hasValue} from "../../../root/domain/Util";

class DoctorDao {

    constructor() {
    }

    getPatientInfo = (nationalId) => {
        return rootDao.getUser()
            .then(doctor => {
                const patient = doctor.patients.filter(patient => patient.nationalId === nationalId)[0];
                if (hasValue(patient)) return patient;
                throw "NOT_FOUND";
            }).catch(err => {
                throw "NOT_FOUND";
            })
    }
}

export const doctorDao = new DoctorDao();
