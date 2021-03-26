import {hasValue} from "../../domain/util/Util";

const REMOTE_SERVER = "http://37.152.185.234";
const LOCAL_SERVER = "http://192.168.0.100:3000";

export const SERVER_ADDRESS = LOCAL_SERVER;
export const API_PATH = `${SERVER_ADDRESS}/api/v1`;

export function formatError(err) {
    let errorObject = {
        status: 400,
        code: 'ERROR',
        message: 'خطا در ارتباط با سرور',
        detailedMessage: "",
        data: {},
    }
    if (!hasValue(err) || !(err instanceof Object))
        return errorObject;

    errorObject.status = err.status || errorObject.status;
    errorObject.code = err.code || errorObject.code;
    errorObject.detailedMessage = err.message || "";
    return errorObject;
}

