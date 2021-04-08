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

}


