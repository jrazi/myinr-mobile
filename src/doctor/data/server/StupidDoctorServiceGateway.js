import {DEFAULT_TIMEOUT, withTimeout} from "../../../root/data/server/util";
import Doctor from "../../../root/domain/Doctor";
import Patient from "../../../root/domain/Patient";
import {ErrorType, getErrorType} from "../../../root/data/server/errors";
import {FirstVisit} from "../../domain/visit/Visit";
import {fetchList, fetchUniqueRecord} from "../../../root/data/server/Sql";


export default class StupidDoctorServiceGateway {

    constructor() {
    }

    getFirstVisit = (patientUserId) => {
        return withTimeout(DEFAULT_TIMEOUT, fetchList(fetchFirstVisitQuery(patientUserId)))
            .then(recordset => recordset[0])
            .then(firstVisitDto => {
                firstVisitDto._sub = {};
                return withTimeout(DEFAULT_TIMEOUT, fetchList(drugHistoryQuery(patientUserId)))
                    .then(drugHistory => {
                        firstVisitDto._sub.DrugHistory = drugHistory;
                        let firstVisit = FirstVisit.ofDao(firstVisitDto);
                        return firstVisit;
                    })
            })
            .catch(err => {
                throw {
                    errorType: getErrorType(err),
                }
            });
    }

    searchDrugs = (drugName) => {
        return withTimeout(DEFAULT_TIMEOUT, fetchList(searchDrugsQuery(drugName)))
            .then(recordset => {
                return recordset;
            })
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
        ORDER BY fdt.IDDosage DESC, cvt.ID DESC, hbt.ID DESC OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY
    `;
}

const searchDrugsQuery = (drugName) => {
    return `
        SELECT * 
        FROM myinrir_test.myinrir_test.DrugTbl dt 
        WHERE LOWER(dt.DrugName) LIKE LOWER('%${drugName}%')
        ORDER BY dt.IDDrug 
        OFFSET 0 ROWS 
        FETCH NEXT 50 ROWS ONLY 
    `;
}

const drugHistoryQuery = (patientUserId) => {
    return `
        SELECT *
        FROM myinrir_test.myinrir_test.PaDrTbl pdt 
        WHERE pdt.IDPatient = ${patientUserId}
    `;
}