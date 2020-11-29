
import Patient from "../../../patient/domain/Patient";
import Doctor from "../../../doctor/domain/Doctor";

function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds*1000));
}

export default class MockServerGateway {

    constructor() {
    }

    async fetchUserDataWithLogin(username, password) {
        if (password == 'password') {
            let user = await this.fetchUserData(username);
            return user;
        } else {
            return null;
        }
    }

    async login(username, password) {
        return;
    }

    async fetchUserData(username) {
        await sleep(3);
        if (username == 'doctor') {
            return new Doctor({fullName: 'حبیب سربلند', username: 'doctor'});
        }
        else if (username == 'patient') {
            return new Patient({fullName: 'علی داوودنژاد', username: 'patient'});
        }
    }

    async logout(username) {
        await sleep(2);
        return {};
    }
}