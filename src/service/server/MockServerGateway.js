
import Patient from "../../domain/user/patient/Patient";

export default class MockServerGateway {

    constructor() {
    }

    fetchUserDataWithLogin(username, password) {
        return new Patient({fullName: 'Javadd', username: '5040'});
    }

    login(username, password) {
        return;
    }


}