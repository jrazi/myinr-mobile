export const ErrorType = {
    RECORD_NOT_UNIQUE: 'RECORD_NOT_UNIQUE',
    UNABLE_TO_PARSE: 'UNABLE_TO_PARSE',
    RECORD_NOT_FOUND: 'RECORD_NOT_FOUND',
    TIMEOUT: 'TIMEOUT',
    CONNECTION_FAILED: 'CONNECTION_FAILED',
    UNKNOWN: 'UNKNOWN',
}

export function getErrorType(error) {
    if (error == null || error == undefined || error['errorType'] == undefined || error['errorType'] == null)
        return ErrorType.UNKNOWN;
    if (error.errorType in ErrorType)
        return ErrorType[error.errorType];
    else return ErrorType.UNKNOWN;
}