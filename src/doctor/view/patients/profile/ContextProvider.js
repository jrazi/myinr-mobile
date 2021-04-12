
import React from "react";

export const PatientProfileContext = React.createContext({patient: {}, firstVisit: {}, endFirstVisit: () => {}});

export const FollowupVisitContext = React.createContext({patient: {}, visits: []});