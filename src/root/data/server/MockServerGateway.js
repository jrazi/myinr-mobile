
import Patient from "../../../patient/domain/Patient";

function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds*1000));
}

export default class MockServerGateway {

    constructor() {
    }

    async fetchUserDataWithLogin(username, password) {
        await sleep(2);
        return new Patient({fullName: 'Javadd', username: '5040'});
    }

    async login(username, password) {
        return;
    }

    async fetchUserData(username) {
        return new Patient({fullName: 'Javadd', username: '5040'});
    }
}