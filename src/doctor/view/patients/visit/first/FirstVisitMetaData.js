import {PreliminaryStage} from "./PreliminaryStage";
import {PastMedicalHistoryStage} from "./PastMedicalHistoryStage";
import {DosageRecommendationStage} from "./DosageRecommendationStage";
import React from "react";
import {InrInfoStage} from "./InrInfoStage";
import {PhysicalExamStage} from "./PhysicalExamStage";
import CHA2DS2_VAScStage from "./CHA2DS2_VAScStage";
import {HAS_BLEDStage} from "./HAS_BLEDStage";
import {LabTestStage} from "./LabTestStage";
import {Echocardiography} from "./Echocardiography";
import DrugHistoryStage from "./DrugHistoryStage";
import {ReportStage} from "./ReportStage";
import {ElectrocardiographyStage} from "./ElectrocardiographyStage";
import {BleedingTypesStage} from "./BleedingTypesStage";
import {HabitsStage} from "./HabitsStage";

export const stages = [
    (props) => <PreliminaryStage {...props}/>,
    (props) => <InrInfoStage {...props}/>,
    (props) => <BleedingTypesStage {...props}/>,
    (props) => <PastMedicalHistoryStage {...props}/>,
    (props) => <DrugHistoryStage {...props}/>,
    (props) => <HabitsStage {...props}/>,
    (props) => <PhysicalExamStage {...props}/>,
    (props) => <CHA2DS2_VAScStage {...props}/>,
    (props) => <HAS_BLEDStage {...props}/>,
    (props) => <LabTestStage {...props}/>,
    (props) => <ElectrocardiographyStage {...props}/>,
    (props) => <Echocardiography {...props}/>,
    (props) => <DosageRecommendationStage {...props}/>,
    (props) => <ReportStage {...props}/>,
]

export const STAGE_NAMES = {
    0: 'Warfarin Info',
    1: 'INR',
    2: 'Recent Incidents',
    3: 'Medical History',
    4: 'Drug History',
    5: 'Habits',
    6: 'Physical Exam',
    7: 'CHA2DS2',
    8: 'HAS-BLED',
    9: 'Lab Test',
    10: 'ECG',
    11: 'ECHO',
    12: 'Prescription',
    13: 'Conclusion',
}