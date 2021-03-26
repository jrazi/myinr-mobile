import {TokenService} from "../../../root/data/server/TokenService";
import {DEFAULT_TIMEOUT, withTimeout} from "../../../root/data/server/util";
import {API_PATH as API_PATH_PREFIX, formatError} from "../../../root/data/server/ApiUtil";

const API_PATH = `${API_PATH_PREFIX}/doctor`;

class DoctorWebServiceGateway {

    constructor() {
        this.tokenService = TokenService.getInstance();
    }

    getFirstVisit = (patientUserId) => {
        let url = `${API_PATH}/patient/${patientUserId}/firstVisit`;

        return this.tokenService.getAccessToken()
            .then(token => {
                return withTimeout(DEFAULT_TIMEOUT * 4, fetch(url, {
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
            .then(res => res.data.firstVisit)
            .catch(err => {
                console.warn('API Error', err);
                throw formatError(err);
            });
    }

    updateFirstVisit = (patientUserId, firstVisitUpdatedInfo) => {
        let url = `${API_PATH}/patient/${patientUserId}/firstVisit`;

        console.log('first visit info to update is', firstVisitUpdatedInfo);
        return this.tokenService.getAccessToken()
            .then(token => {
                return withTimeout(DEFAULT_TIMEOUT * 4, fetch(url, {
                        method: 'PUT',
                        headers: {
                            Authorization: token,
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({firstVisit: firstVisitUpdatedInfo}),
                    })
                )
            })
            .then(async res => {
                const resData = await res.json();
                if (res.ok) return resData;
                else throw resData;
            })
            .catch(err => {
                console.warn('API Error', err);
                throw formatError(err);
            });
    }

    endFirstVisit = (patientUserId) => {
        let url = `${API_PATH}/patient/${patientUserId}/firstVisit/finish`;

        return this.tokenService.getAccessToken()
            .then(token => {
                return withTimeout(DEFAULT_TIMEOUT, fetch(url, {
                        method: 'PUT',
                        headers: {
                            Authorization: token,
                        },
                    })
                )
            })
            .then(async res => {
                const resData = await res.json();
                if (res.ok) return resData;
                else throw resData;
            })
            .catch(err => {
                console.warn('API Error', err);
                throw formatError(err);
            });
    }

    startFirstVisit = (patientUserId) => {
        let url = `${API_PATH}/patient/${patientUserId}/firstVisit/start`;

        return this.tokenService.getAccessToken()
            .then(token => {
                return withTimeout(DEFAULT_TIMEOUT, fetch(url, {
                        method: 'PUT',
                        headers: {
                            Authorization: token,
                        },
                    })
                )
            })
            .then(async res => {
                const resData = await res.json();
                if (res.ok) return resData;
                else throw resData;
            })
            .catch(err => {
                console.warn('API Error', err);
                throw formatError(err);
            });
    }

    searchDrugs = (drugName) => {
        let url = `${API_PATH}/drugs/search?`;
        let params = {name: drugName}
        url += new URLSearchParams(params).toString();

        return this.tokenService.getAccessToken()
            .then(token => {
                return withTimeout(DEFAULT_TIMEOUT * 2, fetch(url, {
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
            .then(res => res.data.drugs)
            .catch(err => {
                console.warn('API Error', err);
                throw formatError(err);
            });
    }


}
export const doctorService = new DoctorWebServiceGateway();