import {rootDao} from "../../../root/data/dao/RootDao";
import {hasValue} from "../../../root/domain/util/Util";
import {AsyncStorage} from "react-native";
import {doctorService} from "../server/DoctorServiceGateway";
import {serverGateway} from "../../../root/data/server/ServerGateway";
import {FirstVisit} from "../../domain/visit/Visit";

class DoctorDao {

    constructor() {
    }

    withRefresh() {
        return new DoctorDao();
    }

    getPatientsList = async () => {
        const patientsList = await serverGateway.fetchPatientsOfDoctor();
        return patientsList;
    }

    getPatientInfo = async (patientUserId) => {
        const patient = await serverGateway.fetchPatientData(patientUserId);
        return patient;
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
                    .catch(err => {throw err})
            })
    }

    saveCachedVisit = async (patientUserId, cachedVisit, saveRemotely=false) => {
        const currentVisitData = await this.getLocalFirstVisit(patientUserId, false);

        const updatedData = FirstVisit.diff(currentVisitData.visitInfo, cachedVisit.visitInfo);

        if (saveRemotely && Object.keys(updatedData).length > 0)
            await doctorService.updateFirstVisit(patientUserId, updatedData);

        await AsyncStorage.setItem(
            RecordIdentifier.cachedVisit(patientUserId),
            JSON.stringify(cachedVisit)
        );

        return cachedVisit;
    }

    deleteCachedVisit = (patientUserId) => {
        return AsyncStorage.removeItem(RecordIdentifier.cachedVisit(patientUserId));
    }

    getFirstVisitFromServer = (patientUserId) => {
        return doctorService.getFirstVisit(patientUserId)
            .then(firstVisit => firstVisit);
    }
}

export const doctorDao = new DoctorDao();


const RecordIdentifier = {
    visits: (id) => `VISITS:${id}`,
    cachedVisit: (id) => `CACHED_FIRST_VISIT:${id}`,
}
