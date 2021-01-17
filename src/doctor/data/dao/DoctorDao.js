import {rootDao} from "../../../root/data/dao/RootDao";
import {hasValue} from "../../../root/domain/util/Util";
import {AsyncStorage} from "react-native";
import {doctorService} from "../server/DoctorServiceGateway";

class DoctorDao {

    constructor() {
    }

    getPatientInfo = (userId) => {
        return rootDao.getUser()
            .then(doctor => {
                const patient = doctor.patients.filter(patient => patient.userId === userId)[0];
                if (hasValue(patient)) return patient;
                throw "NOT_FOUND";
            })
            .catch(err => {
                throw "NOT_FOUND";
            })
    }

    getVisitState = (patientUserId, patient=null) => {
        return this.getLocalFirstVisit(patientUserId)
            .then(cachedVisit => {
                if (cachedVisit == null) {
                    return (patient == null) ? VisitState.FIRST_VISIT :
                        !patient.visited ? VisitState.FIRST_VISIT : VisitState.FOLLOWUP_VISIT;
                }
                else return VisitState.INCOMPLETE_VISIT;
            })
    }

    getLocalFirstVisit = (patientUserId, forceFresh=false) => {
        return AsyncStorage.getItem(RecordIdentifier.cachedVisit(patientUserId))
            .then(cachedVisit => {
                if (forceFresh || cachedVisit == null) throw {};
                return JSON.parse(cachedVisit);
            })
            .catch(err => {
                return this.getFirstVisitFromServer(patientUserId)
                    .then(visit => {
                        const visitToCache = {visitInfo: visit, currentStage: 0};
                        this.saveCachedVisit(patientUserId, visitToCache);
                        return visitToCache;
                    })
            })
            .catch(err => null)
    }

    saveCachedVisit = (patientUserId, cachedVisit) => {
        return AsyncStorage.setItem(
            RecordIdentifier.cachedVisit(patientUserId),
            JSON.stringify(cachedVisit)
        );
    }

    deleteCachedVisit = (patientUserId) => {
        return AsyncStorage.removeItem(RecordIdentifier.cachedVisit(patientUserId));
    }

    getFirstVisitFromServer = (patientUserId) => {
        return AsyncStorage.getItem(RecordIdentifier.visits(patientUserId))
            .then(visit => {
                if (visit == null) {
                    return doctorService.getFirstVisit(patientUserId)
                        .then(visitHistory => {
                            return visitHistory;
                        })
                }
                return JSON.parse(visit);
            })
            .catch(err => {
                return {};
            })
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
    cachedVisit: (id) => `CACHED_FIRST_VISIT:${id}`,
}
