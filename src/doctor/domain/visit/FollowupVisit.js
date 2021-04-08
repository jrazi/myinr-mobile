import {firstNonEmpty, getFormFormattedJalaliDate, hasValue, jalaliYMDToGeorgian} from "../../../root/domain/util/Util";

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
            recommendationForFuture: null,
            hasTakenWarfarinToday: false,
            visitDate: {...sampleDate},
            visitFlag: true,
            procedurePreparing: "",
            recommendedDaysWithoutWarfarin: "",
            reportComment: "",
            medicationHistory: [],
            recommendedDosage: FollowupVisit.createRecommendedDosageForNextWeek(),
        }

    }

    static createRecommendedDosageForNextWeek() {
        const startingDate = new Date();
        const recommendedDosage = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startingDate);
            date.setDate(startingDate.getDate() + i)
            recommendedDosage.push({
                dosagePH: 0,
                dosagePA: null,
                dosageDate: {
                    timestamp: date.getTime(),
                    jalali: {
                        asString: getFormFormattedJalaliDate(date),
                    }
                }
            })
        }
        return recommendedDosage;
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


