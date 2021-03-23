

export const PreliminaryStage = {
    REASON_FOR_WARFARIN_CONDITIONS: [
        {
            id: '1',
            name: 'DVT',
        },
        {
            id: '2',
            name: 'Pulmonary Embolism',
        },
        {
            id: '3',
            name: 'Non Valvular AF',
        },
        {
            id: '4',
            name: 'Valvular AF',
        },
        {
            id: '5',
            name: 'Post-myocardial Infarction',
        },
    ],
    HEART_VALVE_REPLACEMENT_CONDITIONS: [
        {
            id: '6',
            name: 'MVR',
        },
        {
            id: '7',
            name: 'AVR',
        },
        {
            id: '8',
            name: 'TVR',
        },
    ],
    findConditionById(id) {
        const cond = this.REASON_FOR_WARFARIN_CONDITIONS.find(item => item.id == id);
        return cond || null;
    },
    findHeartValveReplacementConditionById(id) {
        const cond = this.HEART_VALVE_REPLACEMENT_CONDITIONS.find(item => item.id == id);
        return cond || null;
    }
}

export const PastMedicalHistoryStageData = {
    MEDICAL_CONDITIONS: [
        {
            id: 33,
            name: 'Hypertension',
        },
        {
            id: 34,
            name: 'Diabetes Mellitus',
        },
        {
            id: 35,
            name: 'Hyperlipidemia',
        },
        {
            id: 36,
            name: 'Coronary Artery Disease',
        },
        {
            id: 37,
            name: 'Stroke',
        },
        {
            id: 38,
            name: 'Systemic Embolism',
        },
        {
            id: 39,
            name: 'Major Trauma',
        },
        {
            id: 40,
            name: 'Permanent Pace Maker',
        },
        {
            id: 41,
            name: 'ICD',
        },
        {
            id: 42,
            name: 'CRT',
        },
    ]

}
