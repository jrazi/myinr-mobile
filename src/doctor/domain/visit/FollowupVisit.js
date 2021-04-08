import {firstNonEmpty, hasValue, jalaliYMDToGeorgian} from "../../../root/domain/util/Util";

export class FollowupVisit {


    static createNew() {

        const sampleDate = {
            timestamp: null,
            iso: "",
            jalali: {
                asString: "",
                asArray: [
                    null,
                    null,
                    null
                ],
                asObject: {
                    year: null,
                    month: null,
                    day: null
                }
            }
        }
        return {
            id: null,
            patientUserId: null,
            reasonForVisit: [
            ],
            inr: {
                inrTargetRange: {
                    from: "",
                    to: ""
                },
                nextInrCheckDate: "",
                lastInrTest: {
                    hasUsedPortableDevice: false,
                    dateOfLastInrTest: {...sampleDate},
                    timeOfLastInrTest: "",
                    lastInrValue: "",
                    lastInrTestLabInfo: ""
                },
            },
            wasHospitalized: false,
            bleedingOrClottingTypes: [],
            recommendationForFuture: {
            },
            hasTakenWarfarinToday: false,
            visitDate: {...sampleDate},
            visitFlag: true,
            procedurePreparing: "",
            recommendedDaysWithoutWarfarin: "",
            reportComment: "",
            medicationHistory: [],
        }
    }

    static diff(reference, updated) {
        const diff = {};
        for (const key in reference) {
            if (!updated.hasOwnProperty(key)) continue;
            const refVal = reference[key];
            const updatedVal = updated[key];
            if (updatedVal == refVal) continue;
            else if (!hasValue(refVal) || !hasValue(updatedVal)) {
                diff[key] = updatedVal;
            }
            else {
                const refStr = JSON.stringify(refVal);
                const updatedStr = JSON.stringify(updatedVal);
                if (refStr != updatedStr) diff[key] = updatedVal;
            }
        }
        return diff;
    }

}


