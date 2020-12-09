import Patient from "../../domain/Patient";
import Doctor from "../../domain/Doctor";
import {SERVER_ADDRESS} from "../../../../ServerConfig";
import {ErrorType} from "./errors";
import {DEFAULT_TIMEOUT, withTimeout} from "./util";


export function getErrorType(error) {
    if (error == null || error == undefined || error['errorType'] == undefined || error['errorType'] == null)
        return ErrorType.UNKNOWN;
    if (error.errorType in ErrorType)
        return ErrorType[error.errorType];
    else return ErrorType.UNKNOWN;
}

export default class StupidButRealServerGateway {

    constructor() {
    }

    fetchUserDataWithLogin(username, password) {
        return this.fetchUserDataWithQuery(fetchUserWithPasswordQuery(username, password));
    }

    fetchUserDataWithUsername(username) {
        return this.fetchUserDataWithQuery(fetchUserQuery(username));
    }

    fetchUserDataWithQuery(fetchQuery) {
        return withTimeout(DEFAULT_TIMEOUT,fetchUniqueRecord(fetchQuery))
            .then(async user => {
                if (user['RoleUser'] == 1) {
                    user= {...user, ...await this.fetchDoctorData(user['IDUser'])};
                    let doctor = Doctor.ofDao(user);
                    let patients = await this.fetchPatientsOfDoctor(user['IDUser']);
                    doctor.patients = patients.map(patient => Patient.ofDao(patient));
                    return doctor;
                }
                else if (user['RoleUser'] == 3) {
                    user= {...user, ...await this.fetchPatientData(user['IDUser'])};
                    let patient = Patient.ofDao(user);
                    patient.doctorInfo = Doctor.ofDao(user);
                    return patient;
                }
                else throw {
                    errorType: ErrorType.RECORD_NOT_FOUND,
                }
            })
            .catch(err => {
                throw {
                    errorType: getErrorType(err),
                }
            });
    }

    fetchDoctorData(userId) {
        return fetchUniqueRecord(fetchDoctorDataQuery(userId));
    }

    fetchPatientData(userId) {
        return fetchUniqueRecord(fetchPatientDataQuery(userId));
    }

    fetchPatientsOfDoctor(userId) {
        return fetchList(fetchPatientsOfDoctorQuery(userId));
    }

    async logout(username) {
        return {};
    }
}

const fetchUniqueRecord =  (query) => {
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
                }
                else if (response.recordset.length === 0) {
                    throw {
                        errorType: 'RECORD_NOT_FOUND',
                    }
                }
                else throw {
                    errorType: 'UNABLE_TO_PARSE',
                }
            }
            else throw {
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

const fetchList = (query) => {
    const url = createQueryUrl(query);
    return fetch(url)
        .then((response) => response.json())
        .then((response) => {
            if ('recordset' in response) {
                if (response.recordset.length >= 0) return response;
                else throw {
                    errorType: 'UNABLE_TO_PARSE',
                }
            }
            else throw {
                errorType: 'UNABLE_TO_PARSE',
            }
        })
        .then((jsonResponse) => jsonResponse.recordset)
        .catch(error => {
            throw {
                errorType: getErrorType(error),
            }
        })
}

const fetchUserWithPasswordQuery = (username, password) => {
    return `
        SELECT * 
        FROM myinrir_test.dbo.UserTbl ut
        WHERE ut.UsernameUser='${username}' AND ut.PasswordUser='${password}'
    `;
}

const fetchUserQuery = (username) => {
    return `
        SELECT * 
        FROM myinrir_test.dbo.UserTbl ut
        WHERE ut.UsernameUser='${username}'
    `;
}

const createQueryUrl = (query) => {
    return `http://${SERVER_ADDRESS}/query?q=${query}`;
}

const fetchDoctorDataQuery = (userId) => {
    return `
        SELECT * FROM myinrir_test.dbo.PhysicianTbl pt 
        JOIN myinrir_test.dbo.PhAnTbl pToAn on pt.IDUserPhysician = pToAn.IDUserPhAn 
        JOIN myinrir_test.dbo.AnsectorTbl anc on pToAn.IDAncestorPhAn = anc.IDAnsector 
        WHERE pt.IDUserPhysician=${userId}
    `;
}

const fetchPatientDataQuery = (userId) => {
    return `
        SELECT * FROM myinrir_test.dbo.PatientTbl pt 
        LEFT JOIN myinrir_test.dbo.PhysicianTbl doctor ON pt.IDPhysicianPatient = doctor.IDUserPhysician  
        WHERE pt.IDUserPatient=${userId}
    `;
}

const fetchPatientsOfDoctorQuery = (userId) => {
    return `
        SELECT * FROM 
        (
            SELECT *, ROW_NUMBER() OVER(PARTITION BY pt.IDPatient ORDER BY inr.DateofINRTest DESC) rn FROM myinrir_test.dbo.PatientTbl pt 
            LEFT JOIN myinrir_test.myinrir_test.INRTestTbl inr on pt.IDUserPatient = inr.UserIDPatient 
            WHERE pt.IDPhysicianPatient = ${userId}
        ) l
        WHERE rn = 1
    `;
    // return `
    //     SELECT * FROM myinrir_test.dbo.PatientTbl pt
    //     WHERE pt.IDPhysicianPatient = ${userId}
    // `;
}

