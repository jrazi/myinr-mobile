
import Patient from "../../../patient/domain/Patient";
import Doctor from "../../../doctor/domain/Doctor";
import {SERVER_ADDRESS} from "../../../../ServerConfig";

export default class StupidButRealServerGateway {

    constructor() {
    }

    fetchUserDataWithLogin(username, password) {
        return fetchUniqueRecord(fetchUserWithPasswordQuery(username, password))
            .then(async user => {
                if (user['RoleUser'] == 1) {
                    user= {...user, ...await this.fetchDoctorData(user['IDUser'])};
                    let doctor = Doctor.ofDao(user);
                }
                else if (user['RoleUser'] == 3) {
                    user= {...user, ...await this.fetchPatientData(user['IDUser'])};
                    let patient = Patient.ofDao(user);
                }
            })
    }

    async login(username, password) {
        return;
    }

    async fetchUserData(username) {
        return null;
    }

    fetchDoctorData(userId) {
        return fetchUniqueRecord(fetchDoctorDataQuery(userId));
    }

    fetchPatientData(userId) {
        return fetchUniqueRecord(fetchPatientDataQuery(userId));
    }

    async logout(username) {
        return {};
    }
}

const fetchUniqueRecord =  async (query) => {
    const url = createQueryUrl(query);
    return fetch(url)
        .then((response) => response.json())
        .then((response) => {
            // TODO Verification Filter
            return response;
        })
        .then((jsonResponse) => jsonResponse.recordset[0]);

}

const fetchUserWithPasswordQuery = (username, password) => {
    return `
        SELECT * 
        FROM myinrir_test.dbo.UserTbl ut
        WHERE ut.UsernameUser='${username}' AND ut.PasswordUser='${password}'
    `;
}

const createQueryUrl = (query) => {
    return `http://${SERVER_ADDRESS}/query?q=${query}`;
}

const fetchDoctorDataQuery = (userId) => {
    return `
        SELECT * FROM myinrir_test.dbo.PhysicianTbl pt 
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


