import {TokenService} from "./TokenService";
import {formatError} from "./ApiUtil";
import {DEFAULT_TIMEOUT, withTimeout} from "./util";
import { showMessage, hideMessage } from "react-native-flash-message";

export default class ApiService {

    static apiService;

    static getInstance() {
        if (ApiService.apiService == null)
            ApiService.apiService = new ApiService();
        return ApiService.apiService;
    }


    constructor() {
        this.tokenService = TokenService.getInstance();
    }

    fetchFromProtectedEndpoint(url, {method='GET', headers={}, body=null, showErrorNotification=true, throwError=true}={}) {
        return this.tokenService.getAccessToken()
            .then(token => {
                return this.sendApiRequest(url, {
                        method: method,
                        headers: {
                            ...headers,
                            Authorization: token,
                        },
                        body: body,
                    });
            })
            .catch(err => {
                console.warn('API Error', err);
                const apiError =  formatError(err);
                if (showErrorNotification) {
                    showMessage({
                        message: apiError.message || null,
                        description: apiError.detailedMessage || null,
                        type: "danger",
                    });
                }
                if (throwError) {
                    return Promise.reject(apiError);
                }
            });
    }

    fetchFromNonProtectedEndpoint(url, {method='GET', headers={}, body=null, showErrorNotification=true, throwError=true}={}) {
        return this.sendApiRequest(url, {
                method: method,
                headers: headers,
                body: body,
            })
            .catch(err => {
                console.warn('API Error', err);
                const apiError =  formatError(err);
                if (showErrorNotification) {
                    showMessage({
                        message: apiError.message || null,
                        description: apiError.detailedMessage || null,
                        type: "danger",
                    });
                }
                if (throwError) {
                    return Promise.reject(apiError);
                }
            });
    }

    sendApiRequest(url, fetchOptions, {returnOnlyData=true, timeout=DEFAULT_TIMEOUT}={}) {
        return withTimeout(timeout, fetch(url, fetchOptions))
            .then(async res => {
                const resData = await res.json();
                if (res.ok) return resData;
                else throw resData;
            })
            .then(res => returnOnlyData ? res.data : res)
    }
}

