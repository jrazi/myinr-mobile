

import React from "react";

export const StageActivationContext = React.createContext({
    stageEnableStatus: {},
    changeEnableStatus: (stageId, newStatus) => {},
});


export const PatientMessageContext = React.createContext({
    patientMessage: {},
});
