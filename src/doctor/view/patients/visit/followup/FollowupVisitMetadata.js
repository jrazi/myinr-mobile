import React from "react";
import {PreliminaryStage} from "./stages/PreliminaryStage";
import {InrInfoStage} from "./stages/InrInfoStage";
import {RecentIncidentsStage} from "./stages/RecentIncidentsStage";
import DrugHistoryStage from "./stages/DrugHistoryStage";

export const stages = [
    (props) => <PreliminaryStage {...props}/>,
    (props) => <InrInfoStage {...props}/>,
    (props) => <PreliminaryStage {...props}/>,
    (props) => <RecentIncidentsStage {...props}/>,
    (props) => <DrugHistoryStage {...props}/>,
    (props) => <PreliminaryStage {...props}/>,
    (props) => <PreliminaryStage {...props}/>,
]

export const STAGE_NAMES = {
    0: 'Preliminary',
    1: 'INR',
    2: 'Prescription',
    3: 'Recent Incidents',
    4: 'Drug History',
    5: 'Recommendation',
    6: 'Conclusion',
}