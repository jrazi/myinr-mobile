

import React from "react";

export const StageActivationContext = React.createContext({
    stageEnableStatus: {},
    changeEnableStatus: (stageId, newStatus) => {},
});
