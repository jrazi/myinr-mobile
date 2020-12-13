import {PreliminaryStage} from "./PreliminaryStage";
import {PastMedicalHistoryStage} from "./PastMedicalHistoryStage";
import {DosageRecommendationStage} from "./DosageRecommendtionStage";
import React from "react";
import {InrInfoStage} from "./InrInfoStage";

export const stages = [
    (props) => <PreliminaryStage {...props}/>,
    (props) => <InrInfoStage {...props}/>,
    (props) => <PastMedicalHistoryStage {...props}/>,
    (props) => <DosageRecommendationStage {...props}/>,
]
