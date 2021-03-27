import {API_PATH, formatError} from "./ApiUtil";
import ApiService from "./ApiService";
import {DEFAULT_TIMEOUT} from "./util";

class WebServiceGateway {


    constructor() {
        this.apiService =  ApiService.getInstance();
    }

    login(username, password) {
        let url = `${API_PATH}/auth/login?`;
        let params = {username: username, password: password}
        url += new URLSearchParams(params).toString();

        return this.apiService.fetchFromNonProtectedEndpoint(url);
    }

    fetchUserInfo() {
        let url = `${API_PATH}/me`;

        return this.apiService.fetchFromProtectedEndpoint(url, {timeout: DEFAULT_TIMEOUT*2})
            .then(data => data.patient || data.doctor || Promise.reject("Could not determine the role."))
    }

    fetchPatientsOfDoctor() {
        let url = `${API_PATH}/doctor/patient`;

        return this.apiService.fetchFromProtectedEndpoint(url, {timeout: DEFAULT_TIMEOUT*2})
            .then(data => data.patients);
    }

    fetchPatientData(patientUserId) {
        let url = `${API_PATH}/doctor/patient/${patientUserId}`;

        return this.apiService.fetchFromProtectedEndpoint(url, {timeout: DEFAULT_TIMEOUT*2})
            .then(data => data.patient);
    }
}

export const serverGateway = new WebServiceGateway();
