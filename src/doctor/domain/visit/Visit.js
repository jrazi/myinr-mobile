import {UserRole} from "../../../root/domain/Role";
import {normalize} from "../../../root/domain/util/normalize";

export default class FirstVisit {

    static ofDao(info) {
        let visit = {};

        visit.id = normalize(info.IDFirst);

        // Preliminary Data

        visit.reasonForWarfarin = normalize(info.ReasonforusingWarfarin); // TODO
        visit.dateOfDiagnosis = normalize(info.dateofdiagnosis);

        // In case used warfarin
        visit.dateOfFirstWarfarin = normalize(info.dateoffirstWarfarin);

        // INR
        visit.inrTargetRange = normalize(info.INRtargetrange);

        // Last INR
        visit.lastInr = normalize(info.LastINR);
        visit.laboratory = normalize(info.Lab);
        visit.usedPortableDevice = normalize(info.PortableDevice); // TODO
        visit.inrTestTime = normalize(info.TimeofINRTest);
        visit.inrTestDate = normalize(info.DateofINRTest);

        // List Bleeding or clotting since last visit
        visit.bleedingOrClottingType = normalize(info.BleedingorClotting);

        // List(first one) past medical history & etc
        visit.pastMedicalHistory = normalize(info.PastMedicalHistory);
        visit.majorSurgery = normalize(info.MajorSurgery);
        visit.minorSurgery = normalize(info.MinorSurgery);
        visit.hospitalAdmission = normalize(info.HospitalAdmission);


        // List drug history
        visit.drugHistory = normalize(info.DrugHistory);

        // Bad habits (smoking-addiction-alcahol)
        visit.habit = normalize(info.Habit);

        // Physical Exam
        // pressure sys-dis separated by dash
        visit.bloodPressure = normalize(info.BloodPressure);
        visit.pulseRate = normalize(info.PulseRate);
        visit.respiratoryRate = normalize(info.RespiratoryRate);

        // CHA--- whatever score
        visit.ageGroup = normalize(info.Age);
        visit.gender = normalize(info.Sex);
        visit.heartFailureHistory = normalize(info.HeartFailure);
        visit.hypertensionHistory = normalize(info.Hypertension);
        visit.strokeHistory = normalize(info.Stroke);
        visit.heartFailureHistory = normalize(info.HeartFailure);
        visit.heartFailureHistory = normalize(info.Vascular);
        visit.heartFailureHistory = normalize(info.Diabetes);


        // Has-Bled score
        visit.hasBledHypertension = normalize(info.Hypertension); // TODO Differs with has-bled
        visit.renaldisease = normalize(info.Renaldisease);
        visit.liverDisease = normalize(info.Liverdisease);
        visit.hasBledStrokeHistory = normalize(info.Stroke);  // TODO Differs
        visit.priorBleeding = normalize(info.bleeding);
        visit.labileInr = normalize(info.LabileINR);
        visit.oldAgeGroup = normalize(info.Age);    // TODO Differs
        visit.medUsagePredisposingToBleeding = normalize(info.predisposing);
        visit.alcaholOrDrugUsageHistory = normalize(info.drug);


        // Lab Test Result
        visit.Hb = normalize(info.Hb);
        visit.Hct = normalize(info.Hct);
        visit.Plt = normalize(info.Plt);
        visit.Bun = normalize(info.Bun);
        visit.Urea = normalize(info.Urea);
        visit.Cr = normalize(info.Cr);
        visit.Na = normalize(info.Na);
        visit.K = normalize(info.K);
        visit.Alt = normalize(info.Alt);
        visit.Ast = normalize(info.Ast);

        // ECG
        // ecg list
        visit.ECG = normalize(info.ECG);

        // Echocardiography
        visit.EF = normalize(info.EF);
        visit.LAVI = normalize(info.LAVI);
        visit.comment = normalize(info.Comment);


        // Visit date
        visit.visitYear = normalize(info.FYearVisit);
        visit.visitMonth = normalize(info.FMonthVisit);
        visit.visitDay = normalize(info.FDayVisit);
        visit.visitFlag = normalize(info.FFlagVisit);
        visit.visitSaveFlag = normalize(info.FFlagSave);
        visit.endVisitFlag = normalize(info.FlagEndVisit);


        // First Recommended Dosage
        visit.dosageId = normalize(info.IDDosage);
        visit.saturday = normalize(info.Saturday);
        visit.sunday = normalize(info.Sunday);
        visit.monday = normalize(info.Monday);
        visit.tuesday = normalize(info.Tuesday);
        visit.wednesday = normalize(info.Wednesday);
        visit.thursday = normalize(info.Thursday);
        visit.friday = normalize(info.Friday);


        return visit;
    }

}


export default class FollowUpVisit {

    static ofDao(info) {
        let followUpVisit = {};
        return followUpVisit;
    }
}