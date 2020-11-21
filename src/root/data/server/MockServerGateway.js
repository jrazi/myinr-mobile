
import Patient from "../../../patient/domain/Patient";

export default class MockServerGateway {

    constructor() {
    }

    async fetchUserDataWithLogin(username, password) {
        return new Patient({fullName: 'Javadd', username: '5040'});
    }

    async login(username, password) {
        return;
    }

    async fetchUserData(username) {
        return new Patient({fullName: 'Javadd', username: '5040'});
    }
}