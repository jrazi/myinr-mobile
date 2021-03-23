import StupidButRealServerGateway from "./StupidServer";
import {ErrorType, getErrorType} from "./errors";
import {DEFAULT_TIMEOUT, withTimeout} from "./util";
import {fetchUniqueRecord} from "./Sql";
import {hasValue} from "../../domain/util/Util";
import {AsyncStorage} from "react-native";

const SERVER_ADDRESS = "http://192.168.0.100:3000";
const API_PATH = `${SERVER_ADDRESS}/api/v1`;

function formatError(err) {
    let errorObject = {
        status: 400,
        code: 'ERROR',
        message: 'خطا در ارتباط با سرور',
        data: {},
    }
    if (!hasValue(err) || !(err instanceof Object))
        return errorObject;

    errorObject.status = err.status || errorObject.status;
    errorObject.code = err.code || errorObject.code;
    return errorObject;
}

export default class WebServiceGateway extends StupidButRealServerGateway {


    constructor() {
        super();
        this.accessToken = null;
    }

    fetchUserDataWithLogin(username, password) {
        let url = `${API_PATH}/auth/login?`;
        let params = {username: username, password: password}
        url += new URLSearchParams(params).toString();


        return withTimeout(DEFAULT_TIMEOUT, function() {
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
        }(), )
    }

    fetchUserDataWithUsername() {
        let url = `${API_PATH}/me`;

        return this.getAccessToken()
            .then(token => {
                return withTimeout(DEFAULT_TIMEOUT, fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: token,
                    }
                })
            )})
            .then(async res => {
                const resData = await res.json();
                if (res.ok) return resData;
                else throw resData;
            })
            .then(res => res.data)
            .then(data => data.patient || data.doctor || Promise.reject("Could not determine the role.") )
            .catch(err => {
                console.warn('API Error', err);
                throw formatError(err);
            });
    }

    fetchPatientsOfDoctor() {
        let url = `${API_PATH}/doctor/patient`;

        return this.getAccessToken()
            .then(token => {
                return withTimeout(DEFAULT_TIMEOUT, fetch(url, {
                        method: 'GET',
                        headers: {
                            Authorization: token,
                        }
                    })
                )})
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

        return this.getAccessToken()
            .then(token => {
                return withTimeout(DEFAULT_TIMEOUT, fetch(url, {
                        method: 'GET',
                        headers: {
                            Authorization: token,
                        }
                    })
                )})
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

    async getAccessToken({force=false, returnNull=false}={}) {
        if (this.accessToken != null && !force)
            return this.accessToken;

        this.accessToken = null;
        const token = await AsyncStorage.getItem('ACCESS_TOKEN');
        if (token != null) {
            this.accessToken = "Bearer " + token;
            return this.accessToken;
        }
        else if (returnNull) return null;
        else return Promise.reject("No valid token was found");

    }
}
