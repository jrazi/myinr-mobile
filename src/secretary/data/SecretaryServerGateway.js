import {API_PATH as API_PATH_PREFIX} from "../../root/data/server/ApiUtil";
import ApiService from "../../root/data/server/ApiService";
import {DEFAULT_TIMEOUT} from "../../root/data/server/util";


const API_PATH = `${API_PATH_PREFIX}/secretary`;

class SecretaryServerGateway {

    constructor() {
        this.apiService = ApiService.getInstance()
    }

    getAllPatients = () => {
        let url = `${API_PATH}/patient`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT,
        })
            .then(data => data.patients);

    }

    getPatient = (patientUserId) => {
        let url = `${API_PATH}/patient/${patientUserId}`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT,
        })
            .then(data => data.patient);

    }

    upsertPatient = (patientInfo) => {
        let url = `${API_PATH}/patient`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT*1.5,
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({patient: patientInfo}),
        })
            .then(data => data.patient);

    }


}

export const secretaryServerGateway = new SecretaryServerGateway();