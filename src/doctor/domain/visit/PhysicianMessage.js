import {getFormFormattedJalaliDate, hasValue} from "../../../root/domain/util/Util";

export class PhysicianMessage {


    static createNew() {

        function sampleDate() {
            return {
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
        }

        function sampleTime() {
            return {
                asString: "",
                asArray: [
                    null,
                    null,
                ],
                asObject: {
                    hour: null,
                    minute: null,
                }
            };
        }
        return {
            id: null,
            patientUserId: null,
            physicianUserId: null,
            messageDate: sampleDate(),
            messageTime: sampleTime(),
            physicianInstructions: [],
            nextInrCheckDate: sampleDate(),
            nextVisitDate: null,
            visitDate: sampleDate(),
            visitFlag: true,
            recommendedDaysWithoutWarfarin: null,
            hasNewPrescription: false,
            physicianComment: "",
            prescription: this.createRecommendedDosageForNextWeek(),
            patientInfo: {},
        }

    }

    static createRecommendedDosageForNextWeek() {
        const startingDate = new Date();
        const recommendedDosage = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startingDate);
            date.setDate(startingDate.getDate() + i)
            recommendedDosage.push({
                id: null,
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
}
