import {UserRole} from "../../../root/domain/Role";
import {normalize} from "../../../root/domain/util/normalize";
import {firstNonEmpty} from "../../../root/domain/util/Util";

export class FirstVisit {


    static createNew() {
        return {
            id: null,
            patientUserId: null,

            reasonForWarfarin: {},
            heartValveReplacementCondition: {
                replaced: false,
                conditionType: {},
            },
            dateOfDiagnosis: null,
            firstWarfarin: {
                isFirstTime: true,
                weeklyDosage: [],
            },
            inr: {
                testAtHome: false,
                inrResult: null,
                testLocation: null,
                testDate: [null, null, null],
                targetRange: [null, null]
            },
            bleedingOrClottingType: [],
            medicalHistory: {

            },
            drugHistory: [],
            habit: [],
            physicalExam: {

            },
            cha2ds2Score: {
                totalScore: 0,
                ageGroup: null,
                sex: null,
                medicalHistory: {},
            },
            hasBledScore: {

            },
            testResult: {

            },
            ecg: {

            },
            echocardiography: {

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
        visit.patientUserId = normalize(firstNonEmpty(info.IDUserPatient[0], info.IDUserPatient[1]));

        // Preliminary Data


        visit.reasonForWarfarin = normalize(info.ReasonforusingWarfarin); // TODO
        visit.dateOfDiagnosis = normalize(info.dateofdiagnosis);

        // In case used warfarin
        visit.firstWarfarin.dateOfFirstWarfarin = normalize(info.dateoffirstWarfarin);

        // INR
        visit.inr.inrTargetRange = normalize(info.INRtargetrange);

        // Last INR
        visit.inr.lastInr = normalize(info.LastINR);
        visit.inr.laboratory = normalize(info.Lab);
        visit.inr.usedPortableDevice = normalize(info.PortableDevice); // TODO
        visit.inr.inrTestTime = normalize(info.TimeofINRTest);
        visit.inr.inrTestDate = normalize(info.DateofINRTest);

        // List Bleeding or clotting since last visit
        visit.bleedingOrClottingType = normalize(info.BleedingorClotting);

        // List(first one) past medical history & etc
        visit.medicalHistory.pastMedicalHistory = normalize(info.PastMedicalHistory);
        visit.medicalHistory.majorSurgery = normalize(info.MajorSurgery);
        visit.medicalHistory.minorSurgery = normalize(info.MinorSurgery);
        visit.medicalHistory.hospitalAdmission = normalize(info.HospitalAdmission);


        // List drug history
        visit.drugHistory = normalize(info.DrugHistory);

        // Bad habits (smoking-addiction-alcahol)
        visit.habit = normalize(info.Habit);

        // Physical Exam
        // pressure sys-dis separated by dash
        visit.physicalExam.bloodPressure = normalize(info.BloodPressure);
        visit.physicalExam.pulseRate = normalize(info.PulseRate);
        visit.physicalExam.respiratoryRate = normalize(info.RespiratoryRate);

        // CHA--- whatever score
        visit.cha2ds2Score.ageGroup = normalize(info.Age)[0];
        visit.cha2ds2Score.gender = normalize(info.Sex);
        visit.cha2ds2Score.heartFailureHistory = normalize(info.HeartFailure);
        visit.cha2ds2Score.hypertensionHistory = normalize(info.Hypertension)[0];
        visit.cha2ds2Score.strokeHistory = normalize(info.Stroke)[0];
        visit.cha2ds2Score.vascular = normalize(info.Vascular);
        visit.cha2ds2Score.diabetes = normalize(info.Diabetes);


        // Has-Bled score
        visit.hasBledScore.hypertension = normalize(info.Hypertension)[1];
        visit.hasBledScore.renaldisease = normalize(info.Renaldisease);
        visit.hasBledScore.liverDisease = normalize(info.Liverdisease);
        visit.hasBledScore.strokeHistory = normalize(info.Stroke)[1];
        visit.hasBledScore.priorBleeding = normalize(info.bleeding);
        visit.hasBledScore.labileInr = normalize(info.LabileINR);
        visit.hasBledScore.oldAgeGroup = normalize(info.Age)[1];
        visit.hasBledScore.medUsagePredisposingToBleeding = normalize(info.predisposing);
        visit.hasBledScore.alcaholOrDrugUsageHistory = normalize(info.drug);


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
        visit.visitDate.visitFlag = normalize(info.FFlagVisit);

        visit.visitSaveFlag = normalize(info.FFlagSave);
        visit.endVisitFlag = normalize(info.FlagEndVisit);


        // First Recommended Dosage
        visit.recommendedDosage.dosageId = normalize(info.IDDosage);
        visit.recommendedDosage.saturday = normalize(info.Saturday);
        visit.recommendedDosage.sunday = normalize(info.Sunday);
        visit.recommendedDosage.monday = normalize(info.Monday);
        visit.recommendedDosage.tuesday = normalize(info.Tuesday);
        visit.recommendedDosage.wednesday = normalize(info.Wednesday);
        visit.recommendedDosage.thursday = normalize(info.Thursday);
        visit.recommendedDosage.friday = normalize(info.Friday);


        return visit;
    }

}


export class FollowUpVisit {

    static ofDao(info) {
        let followUpVisit = {};
        return followUpVisit;
    }
}