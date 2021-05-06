import React from 'react';

import {View} from "react-native";
import {PatientInfoStage} from "./stages/PatientInfoStage";
import {InstructionStage} from "./stages/InstructionStage";


export function get_stages(readonly=false) {
    return  [...patient_message_stages, ...physician_message_stages];
}

export function get_stage_names(readonly=false) {
    return {...PATIENT_STAGE_NAMES, ...PHYSICIAN_STAGE_NAMES};
}

const patient_message_stages = [
    (props) => <PatientInfoStage {...props}/>,
]

const physician_message_stages = [
    (props) => <InstructionStage {...props}/>,
    (props) => <View {...props}/>,
]

const PATIENT_STAGE_NAMES = {
    0: 'Patient Info',
}

const PHYSICIAN_STAGE_NAMES = {
    1: 'Instructions',
    2: 'Recommendations',
}
