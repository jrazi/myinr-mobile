import {DEFAULT_TIMEOUT, withTimeout} from "../../../root/data/server/util";
import {hasValue} from "../../../root/domain/util/Util";
import {serverGateway} from "../../../root/data/server/ServerGateway";
import StupidDoctorServiceGateway from "./StupidDoctorServiceGateway";

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
                return withTimeout(DEFAULT_TIMEOUT*3, fetch(url, {
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


}