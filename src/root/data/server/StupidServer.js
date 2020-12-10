import Patient from "../../domain/Patient";
import Doctor from "../../domain/Doctor";
import {ErrorType, getErrorType} from "./errors";
import {DEFAULT_TIMEOUT, withTimeout} from "./util";
import {fetchList, fetchUniqueRecord} from "./Sql";


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
}

