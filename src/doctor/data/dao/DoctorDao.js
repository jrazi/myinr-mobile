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


    getLocalFirstVisit = async (patientUserId, forceFresh=false) => {

        return AsyncStorage.getItem(RecordIdentifier.cachedVisit(patientUserId))
            .then(cachedVisit => {
                return cachedVisit ? JSON.parse(cachedVisit) : null;
            })
            .then(cachedVisit => {
                const shouldRefresh = forceFresh || cachedVisit == null;
                const localVisitData = this.buildCachedVisit(cachedVisit);
                if (!shouldRefresh) {
                    return localVisitData;
                }
                return this.getFirstVisitFromServer(patientUserId)
                    .then(async visit => {
                        localVisitData.visitInfo = visit;
                        await this.cacheFirstVisit(patientUserId, localVisitData);
                        return localVisitData;
                    })
                    .catch(err => Promise.reject(err))
            })
            .catch(err => Promise.reject(err))
    }

    updateFirstVisit = async (patientUserId, newInfo, saveRemotely=false) => {
        const currentVisitData = await this.getLocalFirstVisit(patientUserId, false);

        const updatedData = FirstVisit.diff(currentVisitData.visitInfo, newInfo.visitInfo);
        const newCacheObject = this.updateFirstVisitFields(currentVisitData, newInfo);

        if ((Object.keys(updatedData).length || 0) == 0)
            return;

        if (saveRemotely)
            await doctorService.updateFirstVisit(patientUserId, updatedData);

        const localVisitData = this.buildCachedVisit(newCacheObject);
        localVisitData.local.lastEditDate = new Date().toString();

        await this.cacheFirstVisit(patientUserId, localVisitData);

        return localVisitData;
    }

    startFirstVisit = async (patientUserId) => {
        const startResult = await doctorService.startFirstVisit(patientUserId);

        const localVisitData = this.buildCachedVisit(null);
        localVisitData.local.startDate = new Date().toString();
        await this.cacheFirstVisit(patientUserId, localVisitData);

        return localVisitData;
    }

    endFirstVisit = async (patientUserId) => {
        const endResult = await doctorService.endFirstVisit(patientUserId);

        const cacheUpdateResult = await this.getLocalFirstVisit(patientUserId, false)
            .then(firstVisitData => {
                firstVisitData.visitInfo.flags.isEnded = true;
                firstVisitData.local.endDate = new Date().toString();
                return firstVisitData;
            })
            .then(firstVisitData => this.cacheFirstVisit(patientUserId, firstVisitData));

        return cacheUpdateResult;
    }

    deleteCachedVisit = (patientUserId) => {
        return AsyncStorage.removeItem(RecordIdentifier.cachedVisit(patientUserId));
    }

    getFirstVisitFromServer = (patientUserId) => {
        return doctorService.getFirstVisit(patientUserId)
            .then(firstVisit => firstVisit);
    }

    buildCachedVisit = (cachedVisit) => {
        const builtObject = {};
        const refObject = cachedVisit || {};

        builtObject.visitInfo = refObject.visitInfo || {};
        builtObject.currentStage = refObject.currentStage || 0;
        builtObject.local ={
            startDate: (refObject.local || {}).startDate || null,
            lastEditDate: (refObject.local || {}).lastEditDate || null,
            endDate: (refObject.local || {}).endDate || null,
        }
        return builtObject;
    }


    cacheFirstVisit = async (patientUserId, cachedVisit) => {
        const localVisitData = this.buildCachedVisit(cachedVisit);
        await AsyncStorage.setItem(
            RecordIdentifier.cachedVisit(patientUserId),
            JSON.stringify(localVisitData)
        );

        return localVisitData;
    }

    updateFirstVisitFields = (source, updatedInfo) => {
        if (!hasValue(source) || !hasValue(updatedInfo)) return source;

        source.visitInfo = updatedInfo.visitInfo;
        source.currentStage = updatedInfo.currentStage;
        return source;
    }
}

export const doctorDao = new DoctorDao();


const RecordIdentifier = {
    visits: (id) => `VISITS:${id}`,
    cachedVisit: (id) => `CACHED_FIRST_VISIT:${id}`,
}
