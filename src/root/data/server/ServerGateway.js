import {TokenService} from "./TokenService";
import {API_PATH, formatError} from "./ApiUtil";
import {DEFAULT_TIMEOUT, withTimeout} from "./util";
import {AsyncStorage} from "react-native";

class WebServiceGateway {


    constructor() {
        this.tokenService = TokenService.getInstance();
    }

    fetchUserDataWithLogin(username, password) {
        let url = `${API_PATH}/auth/login?`;
        let params = {username: username, password: password}
        url += new URLSearchParams(params).toString();


        return withTimeout(DEFAULT_TIMEOUT, function () {
            return fetch(url, {
                method: 'GET',
            })
                .then(async res => {
                    const resData = await res.json();
                    if (res.ok) return resData;
                    else throw resData;
                })
                .then(res => res.data)
                .catch(err => {
                    console.warn('API Error', err);
                    throw formatError(err);
                })
        }(),)
    }

    fetchUserDataWithUsername() {
        let url = `${API_PATH}/me`;

        return this.tokenService.getAccessToken()
            .then(token => {
                return withTimeout(DEFAULT_TIMEOUT, fetch(url, {
                        method: 'GET',
                        headers: {
                            Authorization: token,
                        }
                    })
                )
            })
            .then(async res => {
                const resData = await res.json();
                if (res.ok) return resData;
                else throw resData;
            })
            .then(res => res.data)
            .then(data => data.patient || data.doctor || Promise.reject("Could not determine the role."))
            .catch(err => {
                console.warn('API Error', err);
                throw formatError(err);
            });
    }

    fetchPatientsOfDoctor() {
        let url = `${API_PATH}/doctor/patient`;

        return this.tokenService.getAccessToken()
            .then(token => {
                return withTimeout(DEFAULT_TIMEOUT, fetch(url, {
                        method: 'GET',
                        headers: {
                            Authorization: token,
                        }
                    })
                )
            })
            .then(async res => {
                const resData = await res.json();
                if (res.ok) return resData;
                else throw resData;
            })
            .then(res => res.data.patients)
            .catch(err => {
                console.warn('API Error', err);
                throw formatError(err);
            });
    }

    fetchPatientData(patientUserId) {
        let url = `${API_PATH}/doctor/patient/${patientUserId}`;

        return this.tokenService.getAccessToken()
            .then(token => {
                return withTimeout(DEFAULT_TIMEOUT, fetch(url, {
                        method: 'GET',
                        headers: {
                            Authorization: token,
                        }
                    })
                )
            })
            .then(async res => {
                const resData = await res.json();
                if (res.ok) return resData;
                else throw resData;
            })
            .then(res => res.data.patient)
            .catch(err => {
                console.warn('API Error', err);
                throw formatError(err);
            });
    }


    async logout() {
        const result = await AsyncStorage.clear();
        return;
    }


}
export const serverGateway = new WebServiceGateway();
