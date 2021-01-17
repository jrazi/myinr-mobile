import {UserRole} from "../../../root/domain/Role";
import {
    getBooleanMap,
    normalize,
    normalizeBoolean,
    normalizeListAsString, normalizeNonList,
    normalizeNumber,
    normalizeStrangeListAsString, normalizeStrangeListOfNumbers
} from "../../../root/domain/util/normalize";
import {firstNonEmpty, hasValue, jalaliYMDToGeorgian} from "../../../root/domain/util/Util";
import {PastMedicalHistoryStageData, PreliminaryStage} from "../../view/patients/visit/first/Data";

export class FirstVisit {


    static createNew() {
        return {
            startDate: null,
            lastEditDate: null,
            finished: false,
            finishDate: null,
            id: null,
            patientUserId: null,
            reasonForWarfarin: {},
            heartValveReplacementCondition: {
                replaced: false,
                conditionType: {},
            },
            dateOfDiagnosis: null,
            firstWarfarin: {
                dateOfFirstWarfarin: null,
                isFirstTime: true,
                weeklyDosage: {
                    saturday: 0,
                    sunday: 0,
                    monday: 0,
                    tuesday: 0,
                    wednesday: 0,
                    thursday: 0,
                    friday: 0,
                },
            },
            inr: {
                testAtHome: false,
                testLocation: null,
                inrResult: null,
                testDate: null,
                targetRange: [null, null]
            },
            bleedingOrClottingType: [],
            medicalHistory: {
                majorSurgery: {
                    active: false,
                    info: null,
                },
                minorSurgery: {
                    active: false,
                    info: null,
                },
                hospitalAdmission: {
                    active: false,
                    info: null,
                },
                pastConditions: {

                }
            },
            drugHistory: [],
            habit: [],
            physicalExam: {
                bloodPressureSystolic: null,
                bloodPressureDiastolic: null,
                heartBeat: null,
                respiratoryRate: null,
            },
            cha2ds2Score: {
                totalScore: 0,
                ageGroup: null,
                sex: null,
                medicalHistory: {},
            },
            hasBledScore: {
                totalScore: 0,
                medicalConditions: {},
            },
            testResult: {

            },
            ecg: {

            },
            echocardiography: {
                EF: null,
                LAVI: null,
                comment: null,
            },
            visitDate: {

            },
            visitSaveFlag: null,
            endVisitFlag: null,
            recommendedDosage: {

            }
        }
    }

    static ofDao(info) {
        let visit = this.createNew();

        visit.id = normalize(info.IDFirst);
        visit.patientUserId = normalizeNonList(info.IDUserPatient);

        const visitYear = normalize(info.FYearVisit);
        const visitMonth = normalize(info.FMonthVisit);
        const visitDay = normalize(info.FDayVisit);

        visit.startDate = jalaliYMDToGeorgian(visitYear, visitMonth, visitDay);
        visit.finished = normalizeBoolean(info.FlagEndVisit);
        visit.lastEditDate = visit.startDate;
        visit.finishDate = visit.startDate;

        // Preliminary Data


        const warfarinReasonList = normalizeStrangeListAsString(info.ReasonforusingWarfarin);
        const allWarfarinReasons = PreliminaryStage.REASON_FOR_WARFARIN_CONDITIONS;
        const allHeartValveConditions = PreliminaryStage.HEART_VALVE_REPLACEMENT_CONDITIONS;
        visit.reasonForWarfarin = {};
        visit.heartValveReplacementCondition = {
            replaced: false,
            conditionType: {},
        }
        allWarfarinReasons.forEach(reason => {
            if (warfarinReasonList.includes(reason.id.toString()))
                visit.reasonForWarfarin[reason.id] = true;
            else visit.reasonForWarfarin[reason.id] = false;
        })
        allHeartValveConditions.forEach(condition => {
            if (warfarinReasonList.includes(condition.id.toString())) {
                visit.heartValveReplacementCondition.replaced = true;
                visit.heartValveReplacementCondition.conditionType[condition.id] = true;
            }
            else visit.heartValveReplacementCondition.conditionType[condition.id] = false;
        })


        visit.dateOfDiagnosis = normalize(info.dateofdiagnosis);


        // In case used warfarin
        visit.firstWarfarin.dateOfFirstWarfarin = normalize(info.dateoffirstWarfarin);
        visit.firstWarfarin.isFirstTime = !hasValue(visit.firstWarfarin.dateOfFirstWarfarin);
        visit.firstWarfarin.weeklyDosage = {};
        visit.firstWarfarin.weeklyDosage.saturday = normalizeNumber(info.Saturday)*1.25;
        visit.firstWarfarin.weeklyDosage.sunday = normalizeNumber(info.Sunday)*1.25;
        visit.firstWarfarin.weeklyDosage.monday = normalizeNumber(info.Monday)*1.25;
        visit.firstWarfarin.weeklyDosage.tuesday = normalizeNumber(info.Tuesday)*1.25;
        visit.firstWarfarin.weeklyDosage.wednesday = normalizeNumber(info.Wednesday)*1.25;
        visit.firstWarfarin.weeklyDosage.thursday = normalizeNumber(info.Thursday)*1.25;
        visit.firstWarfarin.weeklyDosage.friday = normalizeNumber(info.Friday)*1.25;

        // INR
        visit.inr.targetRange = normalizeListAsString(info.INRtargetrange, '-');

        // Last INR
        visit.inr.testLocation = normalize(info.Lab);
        visit.inr.inrResult = normalize(info.LastINR);
        visit.inr.testAtHome = normalizeBoolean(info.PortableDevice)
        // visit.inr.inrTestTime = normalize(info.TimeofINRTest);
        visit.inr.testDate = normalize(info.DateofINRTest);

        // List Bleeding or clotting since last visit
        visit.bleedingOrClottingType = normalize(info.BleedingorClotting);

        // List(first one) past medical history & etc
        visit.medicalHistory.pastConditions = getBooleanMap(
            PastMedicalHistoryStageData.MEDICAL_CONDITIONS.map(cond => cond.id),
            normalizeStrangeListOfNumbers(info.PastMedicalHistory, ',')
        );

        visit.medicalHistory.majorSurgery.info = normalize(info.MajorSurgery);
        visit.medicalHistory.majorSurgery.active = hasValue(visit.medicalHistory.majorSurgery.info);

        visit.medicalHistory.minorSurgery.info = normalize(info.MinorSurgery);
        visit.medicalHistory.minorSurgery.active = hasValue(visit.medicalHistory.minorSurgery.info);

        visit.medicalHistory.hospitalAdmission.info = normalize(info.HospitalAdmission);
        visit.medicalHistory.hospitalAdmission.active = hasValue(visit.medicalHistory.hospitalAdmission.info);


        // List drug history
        visit.drugHistory = [];
        if (hasValue(info._sub) && Array.isArray(info._sub.DrugHistory)) {
            let infoDrugHistory = info._sub.DrugHistory;
            visit.drugHistory = infoDrugHistory.map(drugItem => {return {
                drugInfo: {
                    DrugName: normalize(drugItem.Drug),
                },
                since: normalize(drugItem.Dateofstart),
                until: normalize(drugItem.Dateofend),
            }})
        }

        // Bad habits (smoking-addiction-alchohol)
        visit.habit = normalize(info.Habit);

        // Physical Exam
        // pressure sys-dis separated by dash
        visit.physicalExam.bloodPressureSystolic = normalize(info.BloodPressure);
        visit.physicalExam.heartBeat = normalize(info.PulseRate);
        visit.physicalExam.respiratoryRate = normalize(info.RespiratoryRate);

        // CHA--- whatever score
        visit.cha2ds2Score.ageGroup = normalizeNumber(info.Age);
        visit.cha2ds2Score.sex = normalizeNumber(normalize(info.Sex));
        visit.cha2ds2Score.medicalHistory.heartFailureHistory = normalizeBoolean(normalize(info.HeartFailure));
        visit.cha2ds2Score.medicalHistory.hypertensionHistory = normalizeBoolean(info.Hypertension);
        visit.cha2ds2Score.medicalHistory.strokeHistory = normalizeBoolean(normalize(info.Stroke));
        visit.cha2ds2Score.medicalHistory.vascular = normalizeBoolean(normalize(info.Vascular));
        visit.cha2ds2Score.medicalHistory.diabetes = normalizeBoolean(normalize(info.Diabetes));


        // Has-Bled score
        visit.hasBledScore.medicalConditions.hypertension = normalizeBoolean(normalize(info.Hypertension));
        visit.hasBledScore.medicalConditions.renalDisease = normalizeBoolean(normalize(info.Renaldisease));
        visit.hasBledScore.medicalConditions.liverDisease = normalizeBoolean(normalize(info.Liverdisease));
        visit.hasBledScore.medicalConditions.strokeHistory = normalizeBoolean(normalize(info.Stroke));
        visit.hasBledScore.medicalConditions.priorBleeding = normalizeBoolean(normalize(info.bleeding));
        visit.hasBledScore.medicalConditions.labileInr = normalizeBoolean(normalize(info.LabileINR));
        visit.hasBledScore.medicalConditions.oldAgeGroup = normalizeBoolean(normalize(info.Age));
        visit.hasBledScore.medicalConditions.medUsagePredisposingToBleeding = normalizeBoolean(normalize(info.predisposing));
        visit.hasBledScore.medicalConditions.alcaholOrDrugUsageHistory = normalizeBoolean(normalize(info.drug));


        // Lab Test Result
        visit.testResult.Hb = normalize(info.Hb);
        visit.testResult.Hct = normalize(info.Hct);
        visit.testResult.Plt = normalize(info.Plt);
        visit.testResult.Bun = normalize(info.Bun);
        visit.testResult.Urea = normalize(info.Urea);
        visit.testResult.Cr = normalize(info.Cr);
        visit.testResult.Na = normalize(info.Na);
        visit.testResult.K = normalize(info.K);
        visit.testResult.Alt = normalize(info.Alt);
        visit.testResult.Ast = normalize(info.Ast);

        // ECG
        // ecg list
        visit.ecg.ECG = normalize(info.ECG);

        // Echocardiography
        visit.echocardiography.EF = normalize(info.EF);
        visit.echocardiography.LAVI = normalize(info.LAVI);
        visit.echocardiography.comment = normalize(info.Comment);


        // Visit date
        visit.visitDate.visitYear = normalize(info.FYearVisit);
        visit.visitDate.visitMonth = normalize(info.FMonthVisit);
        visit.visitDate.visitDay = normalize(info.FDayVisit);

        visit.visitDate.visitFlag = normalizeNumber(info.FFlagVisit);
        visit.visitSaveFlag = normalizeNumber(info.FFlagSave);


        visit.recommendedDosage = {
            dosageId: 0,
            dosageInfo: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
            }
        }

        console.log("FINALIZED_VISIT",
            visit.firstWarfarin.weeklyDosage,
            "FINALIZED_VISIT");
        // First Recommended Dosage
        // visit.recommendedDosage.dosageId = normalize(info.IDDosage);
        // visit.recommendedDosage.saturday = normalize(info.Saturday);
        // visit.recommendedDosage.sunday = normalize(info.Sunday);
        // visit.recommendedDosage.monday = normalize(info.Monday);
        // visit.recommendedDosage.tuesday = normalize(info.Tuesday);
        // visit.recommendedDosage.wednesday = normalize(info.Wednesday);
        // visit.recommendedDosage.thursday = normalize(info.Thursday);
        // visit.recommendedDosage.friday = normalize(info.Friday);

        // visit.recommendedDosage.saturday = normalize(info.Saturday);


        return visit;
    }

}


export class FollowUpVisit {

    static ofDao(info) {
        let followUpVisit = {};
        return followUpVisit;
    }
}