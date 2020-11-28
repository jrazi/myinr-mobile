
import Patient from "../../../patient/domain/Patient";
import Doctor from "../../../doctor/domain/Doctor";

function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds*1000));
}

export default class MockServerGateway {

    constructor() {
    }

    async fetchUserDataWithLogin(username, password) {
        await sleep(3);
        return new Doctor({fullName: 'Javadd', username: '5040'});
    }

    async login(username, password) {
        return;
    }

    async fetchUserData(username) {
        await sleep(3);
        return new Doctor({fullName: 'Javadd', username: '5040'});
    }

    async logout(username) {
        await sleep(2);
        return {};
    }
}