import {TokenService} from "./TokenService";
import {formatError} from "./ApiUtil";
import {DEFAULT_TIMEOUT, withTimeout} from "./util";

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

    fetchFromProtectedEndpoint(url, {method='GET', headers={}, body=null, timeout=DEFAULT_TIMEOUT}={}) {
        return this.tokenService.getAccessToken()
            .then(token => {
                return withTimeout(timeout, this.sendApiRequest(url, {
                        method: method,
                        headers: {
                            ...headers,
                            Authorization: token,
                        },
                        body: body,
                    })
                );
            })
    }

    fetchFromNonProtectedEndpoint(url, {method='GET', headers={}, body=null, timeout=DEFAULT_TIMEOUT}={}) {
        return withTimeout(timeout, this.sendApiRequest(url, {
                method: method,
                headers: headers,
                body: body,
            })
        );
    }

    sendApiRequest(url, fetchOptions, {returnOnlyData=true}={}) {
        return fetch(url, fetchOptions)
            .then(async res => {
                const resData = await res.json();
                if (res.ok) return resData;
                else throw resData;
            })
            .then(res => returnOnlyData ? res.data : res)
            .catch(err => {
                console.warn('API Error', err);
                throw formatError(err);
            });
    }
}

