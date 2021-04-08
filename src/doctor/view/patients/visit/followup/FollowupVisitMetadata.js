import React from "react";
import {PreliminaryStage} from "./stages/PreliminaryStage";

export const stages = [
    (props) => <PreliminaryStage {...props}/>,
    (props) => <PreliminaryStage {...props}/>,
    (props) => <PreliminaryStage {...props}/>,
    (props) => <PreliminaryStage {...props}/>,
    (props) => <PreliminaryStage {...props}/>,
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