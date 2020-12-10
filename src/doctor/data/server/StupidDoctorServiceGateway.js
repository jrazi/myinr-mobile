import {DEFAULT_TIMEOUT, withTimeout} from "../../../root/data/server/util";
import Doctor from "../../../root/domain/Doctor";
import Patient from "../../../root/domain/Patient";
import {ErrorType, getErrorType} from "../../../root/data/server/errors";
import {FirstVisit} from "../../domain/visit/Visit";
import {fetchList, fetchUniqueRecord} from "../../../root/data/server/Sql";


export default class StupidDoctorServiceGateway {

    constructor() {
    }

    getVisitsHistory = (patientUserId) => {
        let visits = [];
        return withTimeout(DEFAULT_TIMEOUT, fetchList(fetchFirstVisitQuery(patientUserId)))
            .then(recordset => recordset[0])
            .then(firstVisitDto => {
                // console.log('so here is the dto', firstVisitDto);
                let firstVisit = FirstVisit.ofDao(firstVisitDto);
                // console.log('and now the domain object', firstVisit);
                visits.push(firstVisit);
                return visits;
            })
            .catch(err => {
                throw {
                    errorType: getErrorType(err),
                }
            });
    }

}

const fetchFirstVisitQuery = (patientUserId) => {
    return `
        SELECT *
        FROM myinrir_test.myinrir_test.FirstTbl ft
        LEFT JOIN myinrir_test.myinrir_test.FirstDosageTbl fdt on ft.IDUserPatient = fdt.IDUserPatient 
        LEFT JOIN myinrir_test.myinrir_test.[CHADS-VAScTbl] cvt on ft.IDUserPatient = cvt.PatientID 
        LEFT JOIN myinrir_test.myinrir_test.[HAS-BLEDTbl] hbt on ft.IDUserPatient = hbt.PatientID 
        WHERE ft.IDUserPatient = ${patientUserId}
    `;
}