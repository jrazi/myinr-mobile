export const STAGES = {
    STARTING: {
        id: 'STARTING',
        stackRoute: 'NewMessageStartingStage',
        order: 0,
        next: 'MESSAGE',
        prev: null,
    },
    INR_INFO: {
        id: 'INR_INFO',
        stackRoute: 'NewMessageInrInfo',
        order: 2,
        next: 'DOSAGE_REPORT',
        prev: 'MESSAGE',
    },
    MESSAGE: {
        id: 'MESSAGE',
        stackRoute: 'NewMessageTextMessage',
        order: 1,
        next: 'INR_INFO',
        prev: 'STARTING',
    },
    DOSAGE_REPORT: {
        id: 'DOSAGE_REPORT',
        stackRoute: 'NewMessageDosageChangeReport',
        order: 3,
        next: null,
        prev: 'INR_INFO',
    },
}