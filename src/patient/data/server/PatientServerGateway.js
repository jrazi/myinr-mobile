import ApiService from "../../../root/data/server/ApiService";
import {DEFAULT_TIMEOUT} from "../../../root/data/server/util";
import {API_PATH as API_PATH_PREFIX} from "../../../root/data/server/ApiUtil";

const API_PATH = `${API_PATH_PREFIX}/patient`;

class PatientServerGateway {

    constructor() {
        this.apiService = ApiService.getInstance()
    }

    getAllMessages = ({merge=true}={}) => {
        let url = `${API_PATH}/message/all?`;
        let params = {merge: merge};
        url += new URLSearchParams(params).toString();

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT*2,
        })
            .then(data => data.messages);

    }

    getIncomingMessages = ({onlyNew=false, groupByNew=false}={}) => {
        let url = `${API_PATH}/message/incoming?`;
        let params = {onlyNew: onlyNew, groupByNew: groupByNew};
        url += new URLSearchParams(params).toString();

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT*2,
        })
            .then(data => data.messages);

    }

    getSingleIncomingMessage = (messageId) => {
        let url = `${API_PATH}/message/incoming/${messageId}`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT*2,
        })
            .then(data => data);

    }


    getOutgoingMessages = () => {
        let url = `${API_PATH}/message/outgoing`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT,
        })
            .then(data => data.messages);

    }

    sendMessageToPhysician = (patientMessage) => {
        let url = `${API_PATH}/message/outgoing`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT*2,
            method: 'POST',
            body: {message: patientMessage},
        })
            .then(data => data);

    }


    getPatientMedicalInfo = () => {
        let url = `${API_PATH}/medical`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT*2,
        })
            .then(data => data.medicalInfo);

    }

}

export const patientServerGateway = new PatientServerGateway();