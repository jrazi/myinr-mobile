import React from 'react';

import {View} from "react-native";


export function get_stages(readonly=false) {
    return readonly ? [...patient_message_stages] : [...patient_message_stages, ...physician_message_stages];
}

export function get_stage_names(readonly=false) {
    return readonly ? {...PATIENT_STAGE_NAMES} : {...PATIENT_STAGE_NAMES, ...PHYSICIAN_STAGE_NAMES};
}

const patient_message_stages = [
    (props) => <View {...props}/>,
    (props) => <View {...props}/>,
]

const physician_message_stages = [
    (props) => <View {...props}/>,
    (props) => <View {...props}/>,
    (props) => <View {...props}/>,
]

const PATIENT_STAGE_NAMES = {
    0: 'Patient Info',
    1: 'Patient Report',
}

const PHYSICIAN_STAGE_NAMES = {
    2: 'Instructions',
    3: 'Recommendations',
    4: 'Comment',
}
