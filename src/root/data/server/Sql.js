import {getErrorType} from "./errors";
import {SERVER_ADDRESS} from "../../../../ServerConfig";

export const fetchUniqueRecord = (query) => {
    const url = createQueryUrl(query);
    return fetch(url)
        .then((response) => response.json())
        .then((response) => {
            if ('recordset' in response) {
                if (response.recordset.length === 1) return response;
                else if (response.recordset.length > 1) {
                    return response;
                    // TODO decide
                    // throw {
                    //     errorType: 'RECORD_NOT_UNIQUE',
                    // }
                } else if (response.recordset.length === 0) {
                    throw {
                        errorType: 'RECORD_NOT_FOUND',
                    }
                } else throw {
                    errorType: 'UNABLE_TO_PARSE',
                }
            } else throw {
                errorType: 'UNABLE_TO_PARSE',
            }
        })
        .then((jsonResponse) => jsonResponse.recordset[0])
        .catch(error => {
            throw {
                errorType: getErrorType(error),
            }
        })
}
export const fetchList = (query) => {
    const url = createQueryUrl(query);
    return fetch(url)
        .then((response) => response.json())
        .then((response) => {
            if ('recordset' in response) {
                if (response.recordset.length >= 0) return response;
                else {
                    throw {
                        errorType: 'UNABLE_TO_PARSE',
                    }
                }
            } else throw {
                errorType: 'UNABLE_TO_PARSE',
            }
        })
        .then((jsonResponse) => {
            return jsonResponse.recordset;
        })
        .catch(error => {
            throw {
                errorType: getErrorType(error),
            }
        })
}
const createQueryUrl = (query) => {
    return encodeURI(`http://${SERVER_ADDRESS}/query?q=${query}`);
}