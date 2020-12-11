import {PreliminaryStage} from "./PreliminaryStage";
import {HasBledScoreStage} from "./HasBledScoreStage";
import {DosageRecommendationStage} from "./DosageRecommendtionStage";
import React from "react";

export const stages = [
    (props) => <PreliminaryStage props={props}/>,
    (props) => <HasBledScoreStage props={props}/>,
    (props) => <DosageRecommendationStage props={props}/>,
]