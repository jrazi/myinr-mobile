import {ErrorType} from "./errors";


export function withTimeout(ms, promise) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject({
                errorType: ErrorType.TIMEOUT,
            })
        }, ms)

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

export const DEFAULT_TIMEOUT = 10000;

