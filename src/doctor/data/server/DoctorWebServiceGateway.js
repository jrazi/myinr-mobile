import {DEFAULT_TIMEOUT, withTimeout} from "../../../root/data/server/util";
import {hasValue} from "../../../root/domain/util/Util";
import {serverGateway} from "../../../root/data/server/ServerGateway";
import StupidDoctorServiceGateway from "./StupidDoctorServiceGateway";
import {fetchList} from "../../../root/data/server/Sql";

const SERVER_ADDRESS = "http://192.168.0.100:3000";
const API_PATH = `${SERVER_ADDRESS}/api/v1/doctor`;

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

export default class DoctorWebServiceGateway extends StupidDoctorServiceGateway {

    constructor() {
        super();
        this.webServiceGateway = serverGateway;
    }

    getFirstVisit = (patientUserId) => {
        let url = `${API_PATH}/patient/${patientUserId}/firstVisit`;

        return this.webServiceGateway.getAccessToken()
            .then(token => {
                return withTimeout(DEFAULT_TIMEOUT*4, fetch(url, {
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
            .then(res => res.data.firstVisit)
            .catch(err => {
                console.warn('API Error', err);
                throw formatError(err);
            });
    }

    updateFirstVisit = (patientUserId, firstVisitUpdatedInfo) => {
        let url = `${API_PATH}/patient/${patientUserId}/firstVisit`;

        console.log('first vsiit info is', firstVisitUpdatedInfo);
        return this.webServiceGateway.getAccessToken()
            .then(token => {
                return withTimeout(DEFAULT_TIMEOUT*4, fetch(url, {
                        method: 'PUT',
                        headers: {
                            Authorization: token,
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({firstVisit: firstVisitUpdatedInfo}),
                    })
                )})
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

        return this.webServiceGateway.getAccessToken()
            .then(token => {
                return withTimeout(DEFAULT_TIMEOUT*2, fetch(url, {
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
            .then(res => res.data.drugs)
            .catch(err => {
                console.warn('API Error', err);
                throw formatError(err);
            });
    }


}