import React from "react";
import {PreliminaryStage} from "./stages/PreliminaryStage";
import {InrInfoStage} from "./stages/InrInfoStage";
import {RecentIncidentsStage} from "./stages/RecentIncidentsStage";
import DrugHistoryStage from "./stages/DrugHistoryStage";
import {ConclusionStage} from "./stages/ConclusionStage";
import {TreatmentRecommendationStage} from "./stages/TreatmentRecommendationStage";
import {PrescriptionStage} from "./stages/PrescriptionStage";

export const stages = [
    (props) => <PreliminaryStage {...props}/>,
    (props) => <InrInfoStage {...props}/>,
    (props) => <RecentIncidentsStage {...props}/>,
    (props) => <DrugHistoryStage {...props}/>,
    (props) => <TreatmentRecommendationStage {...props}/>,
    (props) => <PrescriptionStage {...props}/>,
    (props) => <ConclusionStage {...props}/>,
]

export const STAGE_NAMES = {
    0: 'Preliminary',
    1: 'INR',
    2: 'Recent Incidents',
    3: 'Drug History',
    4: 'Recommendation',
    5: 'Prescription',
    6: 'Conclusion',
}