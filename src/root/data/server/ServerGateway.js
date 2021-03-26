import {API_PATH, formatError} from "./ApiUtil";
import ApiService from "./ApiService";

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

        return this.apiService.fetchFromProtectedEndpoint(url)
            .then(data => data.patient || data.doctor || Promise.reject("Could not determine the role."))
    }

    fetchPatientsOfDoctor() {
        let url = `${API_PATH}/doctor/patient`;

        return this.apiService.fetchFromProtectedEndpoint(url)
            .then(data => data.patients);
    }

    fetchPatientData(patientUserId) {
        let url = `${API_PATH}/doctor/patient/${patientUserId}`;

        return this.apiService.fetchFromProtectedEndpoint(url)
            .then(data => data.patient);
    }
}

export const serverGateway = new WebServiceGateway();
