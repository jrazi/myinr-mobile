import {PreliminaryStage} from "./PreliminaryStage";
import {PastMedicalHistoryStage} from "./PastMedicalHistoryStage";
import {DosageRecommendationStage} from "./DosageRecommendtionStage";
import React from "react";
import {InrInfoStage} from "./InrInfoStage";
import {PhysicalExamStage} from "./PhysicalExamStage";
import {CHA2DS2_VAScStage} from "./CHA2DS2_VAScStage";

export const stages = [
    (props) => <PreliminaryStage {...props}/>,
    (props) => <InrInfoStage {...props}/>,
    (props) => <PastMedicalHistoryStage {...props}/>,
    (props) => <PhysicalExamStage {...props}/>,
    (props) => <CHA2DS2_VAScStage {...props}/>,
    (props) => <DosageRecommendationStage {...props}/>,
]
