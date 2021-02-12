import {DEFAULT_TIMEOUT, withTimeout} from "../../../root/data/server/util";
import Doctor from "../../../root/domain/Doctor";
import Patient from "../../../root/domain/Patient";
import {ErrorType, getErrorType} from "../../../root/data/server/errors";
import {FirstVisit} from "../../domain/visit/Visit";
import {fetchList, fetchUniqueRecord, transactionQuery, upsertQuery} from "../../../root/data/server/Sql";
import {firstVisitExample} from "./MockData";
import {getListOfTrues, listToString, mergeListStrings, nullToBlank} from "../../../root/domain/util/normalize";


export default class StupidDoctorServiceGateway {

    constructor() {
    }

    getFirstVisit = (patientUserId) => {
        return withTimeout(DEFAULT_TIMEOUT, fetchList(fetchFirstVisitQuery(patientUserId)))
            .then(recordset => recordset[0])
            .then(firstVisitDto => {
                // firstVisitDto = firstVisitExample;
                console.log("SOME VISIT DTO WAS CACHED", firstVisitDto);
                firstVisitDto._sub = {};
                return withTimeout(DEFAULT_TIMEOUT, fetchList(drugHistoryQuery(patientUserId)))
                    .then(drugHistory => {
                        firstVisitDto._sub.DrugHistory = drugHistory;
                        let firstVisit = FirstVisit.ofDao(firstVisitDto);
                        firstVisitTableUpsertQuery(patientUserId, firstVisit);
                        console.log("DONE! RETURNING VISIT");

                        return firstVisit;
                    })
            })
            .catch(err => {
                console.log("ERROR IN GETTING VISIT", err);
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

const firstVisitTableUpsertQuery = (patientUserId, firstVisit) => {
    let dao = {};

    dao.ReasonforusingWarfarin = mergeListStrings(
        '-',
        listToString(getListOfTrues(firstVisit.reasonForWarfarin)),
        listToString(getListOfTrues(firstVisit.heartValveReplacementCondition.conditionType))
    );

    dao.INRtargetrange = listToString(firstVisit.inr.targetRange, '-');
    dao.LastINR = firstVisit.inr.inrResult;
    dao.Lab = firstVisit.inr.testLocation;
    dao.DateofINRTest = firstVisit.inr.testDate;
    dao.TimeofINRTest = '';
    dao.PortableDevice= firstVisit.inr.testAtHome ? '1' : '0';
    dao.BleedingorClotting = ''; // TODO TBD
    dao.PastMedicalHistory = listToString(getListOfTrues(firstVisit.medicalHistory.pastConditions), ',')
    dao.MajorSurgery = nullToBlank(firstVisit.medicalHistory.majorSurgery.info);
    dao.MinorSurgery = nullToBlank(firstVisit.medicalHistory.minorSurgery.info);
    dao.HospitalAdmission = nullToBlank(firstVisit.medicalHistory.hospitalAdmission.info);
    dao.DrugHistory = 1; // TODO TBD
    dao.Habit = ''; // TODO TBD
    dao.BloodPressure = `${firstVisit.physicalExam.bloodPressureSystolic}-${firstVisit.physicalExam.bloodPressureDiastolic}`;
    dao.PulseRate = firstVisit.physicalExam.heartBeat;
    dao.RespiratoryRate = firstVisit.physicalExam.respiratoryRate;

    dao.Hb = firstVisit.testResult.Hb;
    dao.Hct = firstVisit.testResult.Hct;
    dao.Plt = firstVisit.testResult.Plt;
    dao.Bun = firstVisit.testResult.Bun;
    dao.Urea = firstVisit.testResult.Urea;
    dao.Cr = firstVisit.testResult.Cr;
    dao.Na = firstVisit.testResult.Na;
    dao.K = firstVisit.testResult.K;
    dao.Alt = firstVisit.testResult.Alt;
    dao.Ast = firstVisit.testResult.Ast;

    dao.ECG = ''; // TODO TBD

    dao.EF = firstVisit.echocardiography.EF;
    dao.LAVI = firstVisit.echocardiography.LAVI;
    dao.Comment = firstVisit.echocardiography.Comment;

    dao.IDUserPatient = firstVisit.patientUserId;

    dao.FYearVisit = firstVisit.visitDate.visitYear;
    dao.FMonthVisit = firstVisit.visitDate.visitMonth;
    dao.FDayVisit = firstVisit.visitDate.visitDay;

    dao.FFlagVisit = 0; // TODO TBD
    dao.FlagEndVisit = firstVisit.finished ? 1 : 0;

    dao.CommentReport = ''; // TODO TBD
    dao.NextINRCheck = ''; // TODO TBD

    dao.dateofdiagnosis = ''; // TODO TBD
    dao.dateoffirstWarfarin = ''; // TODO TBD



    let notExistsQuery = `SELECT * FROM myinrir_test.myinrir_test.FirstTbl ft WHERE ft.IDUserPatient = ${patientUserId}`;
    let insertQuery = `
        INSERT INTO myinrir_test.myinrir_test.FirstTbl (ReasonforusingWarfarin,dateofdiagnosis,dateoffirstWarfarin,INRtargetrange,LastINR,Lab,PortableDevice,TimeofINRTest,DateofINRTest,BleedingorClotting,PastMedicalHistory,MajorSurgery,MinorSurgery,HospitalAdmission,DrugHistory,Habit,BloodPressure,PulseRate,RespiratoryRate,Hb,Hct,Plt,Bun,Urea,Cr,Na,K,Alt,Ast,ECG,EF,LAVI,Comment,IDUserPatient,FYearVisit,FMonthVisit,FDayVisit,FFlagVisit,FFlagSave,FlagEndVisit,CommentReport,NextINRCheck) 
        VALUES ('${dao.ReasonforusingWarfarin}','','','${dao.INRtargetrange}','${dao.LastINR}','${dao.Lab}','${dao.PortableDevice}','${dao.TimeofINRTest}','${dao.DateofINRTest}','${dao.BleedingorClotting}','${dao.PastMedicalHistory}','${dao.MajorSurgery}','${dao.MinorSurgery}','${dao.HospitalAdmission}',${dao.DrugHistory},'${dao.Habit}','${dao.BloodPressure}','${dao.PulseRate}','${dao.RespiratoryRate}','${dao.Hb}','${dao.Hct}','${dao.Plt}','${dao.Bun}','${dao.Urea}','${dao.Cr}','${dao.Na}','${dao.K}','${dao.Alt}','${dao.Ast}','${dao.ECG}','${dao.EF}','${dao.LAVI}','${dao.Comment}',${dao.IDUserPatient},${dao.FYearVisit},${dao.FMonthVisit},${dao.FDayVisit},0,1,${dao.FlagEndVisit},'${dao.CommentReport}','${dao.NextINRCheck}')
    `;
    let updateQuery = `
        UPDATE myinrir_test.myinrir_test.FirstTbl
        SET ReasonforusingWarfarin='${dao.ReasonforusingWarfarin}', INRtargetrange='${dao.INRtargetrange}', LastINR='${dao.LastINR}', Lab='${dao.Lab}', PortableDevice='${dao.PortableDevice}', TimeofINRTest='${dao.TimeofINRTest}', DateofINRTest='${dao.DateofINRTest}', PastMedicalHistory='${dao.PastMedicalHistory}', MajorSurgery='${dao.MajorSurgery}', MinorSurgery='${dao.MinorSurgery}', HospitalAdmission='${dao.HospitalAdmission}', DrugHistory=${dao.DrugHistory}, BloodPressure='${dao.BloodPressure}', PulseRate='${dao.PulseRate}', RespiratoryRate='${dao.RespiratoryRate}', Hb='${dao.Hb}', Hct='${dao.Hct}', Plt='${dao.Plt}', Bun='${dao.Bun}', Urea='${dao.Urea}', Cr='${dao.Cr}', Na='${dao.Na}', K='${dao.K}', Alt='${dao.Alt}', Ast='${dao.Ast}', EF='${dao.EF}', LAVI='${dao.LAVI}', Comment='${dao.Comment}', IDUserPatient=${dao.IDUserPatient}, FYearVisit=${dao.FYearVisit}, FMonthVisit=${dao.FMonthVisit}, FDayVisit=${dao.FDayVisit}, FFlagSave=1, FlagEndVisit=${dao.FlagEndVisit}
        WHERE IDUserPatient = ${dao.IDUserPatient}
    `;

    let upsert = transactionQuery(upsertQuery(notExistsQuery, insertQuery, updateQuery, '\t'));
    console.log("Upsert Query is\n", upsert, "\nUpsert query was printed");
    return upsert;
}

const cha2ds2UpsertQuery = (patientUserId, cha2ds2) => {
    let dao = {};
}

const hadBledUpsertQuery = (patientUserId, hadBled) => {
    let dao = {};
}

const firstDosageUpsertQuery = (patientUserId, firstDosage) => {
    let dao = {};
}