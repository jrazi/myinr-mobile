import {rootDao} from "../../../root/data/dao/RootDao";
import {hasValue} from "../../../root/domain/util/Util";
import {AsyncStorage} from "react-native";

class DoctorDao {

    constructor() {
    }

    getPatientInfo = (nationalId) => {
        return rootDao.getUser()
            .then(doctor => {
                const patient = doctor.patients.filter(patient => patient.nationalId === nationalId)[0];
                if (hasValue(patient)) return patient;
                throw "NOT_FOUND";
            })
            .catch(err => {
                throw "NOT_FOUND";
            })
    }

    getVisitState = (patientNatId) => {
        return this.getCachedVisit(patientNatId)
            .then(cachedVisit => {
                if (cachedVisit == null) {
                    return this.getVisitsHistory(patientNatId)
                        .then(visits => {
                            return (hasValue(visits) && visits.length > 0) ? VisitState.FOLLOWUP_VISIT : VisitState.FIRST_VISIT;
                        })
                }
                else return VisitState.INCOMPLETE_VISIT;
            })
    }

    getCachedVisit = (patientNatId) => {
        return AsyncStorage.getItem(RecordIdentifier.cachedVisit(patientNatId))
            .then(cachedVisit => {
                return JSON.parse(cachedVisit);
            })
            .catch(err => null)
    }

    saveCachedVisit = (patientNatId, cachedVisit) => {
        return AsyncStorage.setItem(
            RecordIdentifier.cachedVisit(patientNatId),
            cachedVisit
        );
    }

    deleteCachedVisit = (patientNatId) => {
        return AsyncStorage.removeItem(RecordIdentifier.cachedVisit(patientNatId));
    }

    getVisitsHistory = (patientNatId) => {
        return AsyncStorage.getItem(RecordIdentifier.visits(patientNatId))
            .then(visit => {
                return JSON.parse(visit);
            })
            .catch(err => [])
    }
}

export const doctorDao = new DoctorDao();

export const VisitState = {
    FIRST_VISIT: 'FIRST_VISIT',
    INCOMPLETE_VISIT: 'INCOMPLETE_EXISTS',
    FOLLOWUP_VISIT: 'FOLLOWUP_VISIT',
}

const RecordIdentifier = {
    visits: (id) => `VISITS:${id}`,
    cachedVisit: (id) => `CACHED_VISIT:${id}`,
}
