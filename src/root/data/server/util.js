import {ErrorType} from "./errors";


export function withTimeout(ms, promise) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject({
                code: ErrorType.TIMEOUT,
                message: `Could not finish request in ${ms} millis`,
            })
        }, ms);
        promise
            .then(value => {
                clearTimeout(timer)
                resolve(value)
            })
            .catch(reason => {
                clearTimeout(timer)
                reject(reason)
            })
    })
}

export const DEFAULT_TIMEOUT = 10000*1.2;

