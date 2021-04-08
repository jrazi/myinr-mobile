
import React from "react";

export const PatientProfileContext = React.createContext({patient: {}, firstVisit: {}, endFirstVisit: () => {}, visits: []});

export const FollowupVisitContext = React.createContext({patient: {}, visits: []});