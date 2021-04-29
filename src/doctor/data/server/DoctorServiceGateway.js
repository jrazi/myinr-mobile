import {DEFAULT_TIMEOUT, withTimeout} from "../../../root/data/server/util";
import {API_PATH as API_PATH_PREFIX, formatError} from "../../../root/data/server/ApiUtil";
import ApiService from "../../../root/data/server/ApiService";

const API_PATH = `${API_PATH_PREFIX}/doctor`;

class DoctorWebServiceGateway {

    constructor() {
        this.apiService =  ApiService.getInstance()
    }

    getFirstVisit = (patientUserId) => {
        let url = `${API_PATH}/patient/${patientUserId}/firstVisit`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT*4,
        })
            .then(data => data.firstVisit);
    }

    updateFirstVisit = (patientUserId, firstVisitUpdatedInfo) => {
        let url = `${API_PATH}/patient/${patientUserId}/firstVisit`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({firstVisit: firstVisitUpdatedInfo}),
            timeout: DEFAULT_TIMEOUT*3,
        })
            .then(data => data.firstVisit);

    }

    endFirstVisit = (patientUserId) => {
        let url = `${API_PATH}/patient/${patientUserId}/firstVisit/finish`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            method: 'PUT',
            timeout: DEFAULT_TIMEOUT,
        });

    }

    startFirstVisit = (patientUserId) => {
        let url = `${API_PATH}/patient/${patientUserId}/firstVisit/start`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            method: 'PUT',
            timeout: DEFAULT_TIMEOUT,
        });
    }

    searchDrugs = (drugName) => {
        let url = `${API_PATH}/drugs/search?`;
        let params = {name: drugName}
        url += new URLSearchParams(params).toString();

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT,
        })
            .then(data => data.drugs);

    }

    getFollowupVisits = (patientUserId) => {
        let url = `${API_PATH}/patient/${patientUserId}/visit`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT,
        })
            .then(data => data.visits);
    }

    saveFollowupVisit = (patientUserId, appointmentId, visitInfo) => {
        let url = `${API_PATH}/patient/${patientUserId}/visit?appointmentId=${appointmentId}`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({visit: visitInfo}),
            timeout: DEFAULT_TIMEOUT*3,
        })
            .then(data => data.visits);

    }



    getAppointments = (patientUserId) => {
        let url = `${API_PATH}/patient/${patientUserId}/appointment`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT,
        })
            .then(data => data.appointments);

    }

    getAllAttendableAppointments = () => {
        let url = `${API_PATH}/appointment`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT * 2,
        })
            .then(data => data.appointments);

    }

    getAllAttendableAppointments = () => {
        let url = `${API_PATH}/appointment`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT * 2,
        })
            .then(data => data.appointments);

    }

    getIncomingMessages = ({onlyNew=false}={}) => {
        let url = `${API_PATH}/message/incoming?`;
        let params = {onlyNew: onlyNew};
        url += new URLSearchParams(params).toString();

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT,
        })
            .then(data => data.messages);

    }

    getOutgoingMessages = () => {
        let url = `${API_PATH}/message/outgoing`;

        return this.apiService.fetchFromProtectedEndpoint(url, {
            timeout: DEFAULT_TIMEOUT,
        })
            .then(data => data.messages);

    }


}

export const doctorService = new DoctorWebServiceGateway();