import {hasValue} from "../../domain/util/Util";

const REMOTE_SERVER = "http://37.152.185.234:3000";
const LOCAL_SERVER = "http://192.168.0.100:3000";

export const SERVER_ADDRESS = __DEV__ ?  LOCAL_SERVER : REMOTE_SERVER;
export const API_PATH = `${SERVER_ADDRESS}/api/v1`;

export function formatError(err) {
    let errorObject = {
        status: 400,
        code: 'ERROR',
        message: 'خطا',
        detailedMessage: 'ارتباط با سرور برقرار نشد.',
        serverMessage: "",
        data: {},
    }
    if (!hasValue(err) || !(err instanceof Object))
        return errorObject;

    switch (err.code || "") {
        case "USERNAME_PASSWORD_MISMATCH":
            errorObject.message = 'نام کاربری یا رمز عبور نادرست است.';
            errorObject.detailedMessage = '';
            break;
        default:
            errorObject.message = 'خطا';
            errorObject.detailedMessage = 'ارتباط با سرور برقرار نشد.';
            break;
    }
    errorObject.status = err.status || errorObject.status;
    errorObject.code = err.code || errorObject.code;
    errorObject.serverMessage = err.message || "";
    return errorObject;
}

