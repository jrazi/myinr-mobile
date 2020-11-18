
import Patient from "../../domain/user/patient/Patient";

export default class MockServerGateway {

    constructor() {
    }

    fetchUserDataWithLogin(username, password) {
        return new Patient({fullName: 'Javad'});
    }

    login(username, password) {
        return new Patient({fullName: 'Javad'});
    }


}