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
            id: null,
            patientUserId: null,
            dateOfDiagnosis: null,
            warfarinInfo: {
                reasonForWarfarin: {
                    conditions: [],
                    heartValveReplacementConditions: []
                },
                dateOfFirstWarfarin: "",
                lastWarfarinDosage: {
                    saturday: 0,
                    sunday: 0,
                    monday: 0,
                    tuesday: 0,
                    wednesday: 0,
                    thursday: 0,
                    friday: 0,
                },
                firstTimeWarfarin: false
            },
            inr: {
                inrTargetRange: {
                    from: "",
                    to: ""
                },
                nextInrCheckDate: "",
                lastInrTest: {
                    hasUsedPortableDevice: false,
                    dateOfLastInrTest: "",
                    lastInrValue: "",
                    lastInrTestLabInfo: ""
                }
            },
            bleedingOrClottingTypes: [],
            medicalHistory: {
                majorSurgery: "",
                minorSurgery: "",
                hospitalAdmission: "",
                pastConditions: [],
            },
            medicationHistory: [],
            habit: [],
            physicalExam: {
                bloodPressure: {
                    systolic: "",
                    diastolic: ""
                },
                heartBeat: "",
                respiratoryRate: "",
            },
            cha2ds2Score: {
                totalScore: 0,
                data: {},
            },
            hasBledScore: {
                totalScore: 0,
                data: {},
            },
            testResult: {
                Hb: "",
                Hct: "",
                Plt: "",
                Bun: "",
                Urea: "",
                Cr: "",
                Na: "",
                K: "",
                Alt: "",
                Ast: ""
            },
            echocardiography: {
                EF: "",
                LAVI: "",
                comment: "",
            },
            electrocardiography: {
                ecg: null,
                avrBlock: null
            },
            visitDate: {
                value: "",
                details: {
                    visitDay: "",
                    visitMonth: "",
                    visitYear: ""
                }
            },
            recommendedDosage: {
                saturday: 0,
                sunday: 0,
                monday: 0,
                tuesday: 0,
                wednesday: 0,
                thursday: 0,
                friday: 0,
            },
            drugHistory: 1,
            reportComment: "",
            flags: {
                visitFlag: false,
                isSaved: true,
                isEnded: false
            },

        }
    }

    static diff(reference, updated) {
        const diff = {};
        for (const key in reference) {
            if (!updated.hasOwnProperty(key)) continue;
            const refVal = reference[key];
            const updatedVal = updated[key];
            if (updatedVal == refVal) continue;
            else if (!hasValue(refVal) || !hasValue(updatedVal)) {
                diff[key] = updatedVal;
            }
            else {
                const refStr = JSON.stringify(refVal);
                const updatedStr = JSON.stringify(updatedVal);
                if (refStr != updatedStr) diff[key] = updatedVal;
            }
        }
        return diff;
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
        visit.finishDate = visit.startDate;

        // Preliminary Data


        const warfarinReasonList = normalizeStrangeListAsString(info.ReasonforusingWarfarin);
        const allWarfarinReasons = PreliminaryStage.REASON_FOR_WARFARIN_CONDITIONS;
        const allHeartValveConditions = PreliminaryStage.HEART_VALVE_REPLACEMENT_CONDITIONS;
        visit.reasonForWarfarin = {};
        visit.heartValveReplacementConditions = {
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
                visit.heartValveReplacementConditions.replaced = true;
                visit.heartValveReplacementConditions.conditionType[condition.id] = true;
            }
            else visit.heartValveReplacementConditions.conditionType[condition.id] = false;
        })


        visit.dateOfDiagnosis = normalize(info.dateofdiagnosis);


        // In case used warfarin
        visit.firstWarfarin.dateOfFirstWarfarin = normalize(info.dateoffirstWarfarin);
        visit.warfarinInfo.firstTimeWarfarin = !hasValue(visit.firstWarfarin.dateOfFirstWarfarin);
        visit.warfarinInfo.lastWarfarinDosage = {};
        visit.warfarinInfo.lastWarfarinDosage.saturday = normalizeNumber(info.Saturday)*1.25;
        visit.warfarinInfo.lastWarfarinDosage.sunday = normalizeNumber(info.Sunday)*1.25;
        visit.warfarinInfo.lastWarfarinDosage.monday = normalizeNumber(info.Monday)*1.25;
        visit.warfarinInfo.lastWarfarinDosage.tuesday = normalizeNumber(info.Tuesday)*1.25;
        visit.warfarinInfo.lastWarfarinDosage.wednesday = normalizeNumber(info.Wednesday)*1.25;
        visit.warfarinInfo.lastWarfarinDosage.thursday = normalizeNumber(info.Thursday)*1.25;
        visit.warfarinInfo.lastWarfarinDosage.friday = normalizeNumber(info.Friday)*1.25;

        // INR
        visit.inr.targetRange = normalizeListAsString(info.INRtargetrange, '-');

        // Last INR
        visit.inr.testLocation = normalize(info.Lab);
        visit.inr.inrResult = normalize(info.LastINR);
        const portableDevice = normalizeBoolean(info.PortableDevice);
        visit.inr.testAtHome = portableDevice;
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
        visit.medicationHistory = [];
        if (hasValue(info._sub) && Array.isArray(info._sub.DrugHistory)) {
            let infoDrugHistory = info._sub.DrugHistory;
            visit.medicationHistory = infoDrugHistory.map(drugItem => {return {
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
        let bloodPressures = normalizeStrangeListAsString(info.BloodPressure, '-', '/');
        if (!hasValue(bloodPressures)) bloodPressures = ['', ''];
        if (!hasValue(bloodPressures[0])) bloodPressures[0] = '';
        if (!hasValue(bloodPressures[1])) bloodPressures[1] = '';

        visit.physicalExam.bloodPressureSystolic = bloodPressures[0];
        visit.physicalExam.bloodPressureDiastolic = bloodPressures[1];
        visit.physicalExam.heartBeat = normalize(info.PulseRate);
        visit.physicalExam.respiratoryRate = normalize(info.RespiratoryRate);

        // CHA--- whatever score
        visit.cha2ds2Score.data.ageGroup = normalizeNumber(info.Age);
        visit.cha2ds2Score.data.gender = normalizeNumber(normalize(info.Sex));
        visit.cha2ds2Score.data.heartFailureHistory = normalizeBoolean(normalize(info.HeartFailure));
        visit.cha2ds2Score.data.hypertensionHistory = normalizeBoolean(info.Hypertension);
        visit.cha2ds2Score.data.strokeHistory = normalizeBoolean(normalize(info.Stroke));
        visit.cha2ds2Score.data.vascular = normalizeBoolean(normalize(info.Vascular));
        visit.cha2ds2Score.data.diabetes = normalizeBoolean(normalize(info.Diabetes));


        // Has-Bled score
        visit.hasBledScore.medicalConditions.hypertension = normalizeBoolean(normalize(info.Hypertension));
        visit.hasBledScore.medicalConditions.renalDisease = normalizeBoolean(normalize(info.Renaldisease));
        visit.hasBledScore.medicalConditions.liverDisease = normalizeBoolean(normalize(info.Liverdisease));
        visit.hasBledScore.medicalConditions.strokeHistory = normalizeBoolean(normalize(info.Stroke));
        visit.hasBledScore.medicalConditions.priorBleeding = normalizeBoolean(normalize(info.bleeding));
        visit.hasBledScore.medicalConditions.labileInr = normalizeBoolean(normalize(info.LabileINR));
        visit.hasBledScore.medicalConditions.ageGroup = normalizeBoolean(normalize(info.Age));
        visit.hasBledScore.medicalConditions.medUsagePredisposingToBleeding = normalizeBoolean(normalize(info.predisposing));
        visit.hasBledScore.medicalConditions.alcoholOrDrugUsageHistory = normalizeBoolean(normalize(info.drug));


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
            visit.warfarinInfo.lastWarfarinDosage,
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