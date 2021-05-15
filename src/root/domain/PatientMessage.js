import {getFormFormattedJalaliDate} from "./util/Util";
import {PhysicianMessage} from "../../doctor/domain/visit/PhysicianMessage";


export class PatientMessage {


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
            hasInrInfo: false,
            hasWarfarinDosage: false,

            lastWarfarinDosage: PhysicianMessage.createRecommendedDosageForNextWeek(),

            patientComment: "",

            inr: {
                inrTargetRange: {
                    from: null,
                    to: null
                },
                lastInrTest: {
                    hasUsedPortableDevice: false,
                    dateOfLastInrTest: sampleDate(),
                    timeOfLastInrTest: sampleTime(),
                    lastInrValue: null,
                    lastInrTestLabInfo: null
                }
            },
            messageDate: sampleDate(),
            messageTime: sampleTime(),
            bloodPressure: {
                systolic: "",
                diastolic: ""
            },
            dosageChangeDate: {
                timestamp: null,
                iso: null,
                jalali: {
                    asString: null,
                    asArray: [],
                    asObject: {
                        year: null,
                        month: null,
                        day: null
                    }
                }
            },
            bleedingOrClottingTypes: [],
            heartBeat: ""

        }

    }
}
