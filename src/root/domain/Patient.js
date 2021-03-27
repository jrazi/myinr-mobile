import {UserRole} from "./Role";
import {firstNonEmpty, hasValue, removeWhiteSpace, translateGender} from "./util/Util";


export default class Patient {

    static hasMedicalCondition(patient, conditionName) {
        if (!hasValue(patient) || !hasValue(patient.medicalCondition) || !hasValue(patient.medicalCondition.length))
            return false;
        return patient.medicalCondition.some(condition => condition.name == conditionName);
    }

    static getMedicalConditionsListAsString(patient) {
        if (!hasValue(patient) || !hasValue(patient.medicalCondition) || !hasValue(patient.medicalCondition.length))
            return "";
        const conditionsAsString = patient.medicalCondition.reduce((acc, current) => `${acc}-${current.name}`, "");
        return conditionsAsString.substring(1);
    }
}
