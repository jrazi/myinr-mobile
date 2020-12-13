import {PreliminaryStage} from "./PreliminaryStage";
import {HasBledScoreStage} from "./HasBledScoreStage";
import {DosageRecommendationStage} from "./DosageRecommendtionStage";
import React from "react";
import {InrInfoStage} from "./InrInfoStage";

export const stages = [
    (props) => <PreliminaryStage {...props}/>,
    (props) => <InrInfoStage {...props}/>,
    (props) => <HasBledScoreStage {...props}/>,
    (props) => <DosageRecommendationStage {...props}/>,
]
