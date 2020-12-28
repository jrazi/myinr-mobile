import RootRepository from "../repository/RootRepository";
import {Locale} from "../../domain/Locale";
import {serverGateway} from "../server/ServerGateway";
import {AsyncStorage} from "react-native";

class RootDao {

    constructor() {
        this.rootRepository = new RootRepository();
        this.tempLastUpdate = new Date('2018-01-01').getTime()/1000;
        this.user = null;
    }

    withRefresh = () => {
        this.tempLastUpdate = new Date('2018-01-01').getTime()/1000;
        return this;
    }

    async getUser() {
        if (!this.tempTimeToUpdate() && this.user != null) return this.user;

        let user = await this.rootRepository.getUser();
        if (!this.tempTimeToUpdate() && user != null) {
            this.user = user;
            return this.user;
        }

        let userMeta = await this.getUserMetaData();
        if (userMeta == null) return null;

        try {
            user = await serverGateway.fetchUserDataWithUsername(userMeta.username);
            await this.saveUser(user);
        } catch (err) {
            user = await this.getOfflineUser();
            this.user = user;
        }
        return user;
    }

    async getOfflineUser() {
        let user = await this.rootRepository.getUser();
        if (user != null) return user;
        else throw {error: 'user not found.'};
    }

    async getUserMetaData() {
        return await this.rootRepository.getUserMetaData();
    }

    async saveUser(user) {
        let savedUser = await this.rootRepository.saveUser(user);
        this.tempNewDate();
        this.user = savedUser;
        return savedUser;
    }

    async deleteUser() {
        let user = await this.rootRepository.deleteUser();
        this.user = null;
        this.tempLastUpdate = new Date('2018-01-01').getTime()/1000;
        return user;
    }

    getLocale() {
        return Locale.FA;
    }

    setDarkMode(value) {
        return AsyncStorage.setItem(
            'DARK_MODE',
            String(value)
        );
    }

    getDarkMode() {
        return AsyncStorage.getItem('DARK_MODE')
            .then(darkMode => darkMode == 'true');
    }


    tempNewDate() {
        this.tempLastUpdate = new Date().getTime()/1000;
    }

    tempBackwardClock() {
        this.tempLastUpdate = new Date('2018-01-01').getTime()/1000;
    }

    tempTimeToUpdate() {
        return (new Date().getTime()/1000) - (this.tempLastUpdate) > (300);
    }
}

export const rootDao = new RootDao();
