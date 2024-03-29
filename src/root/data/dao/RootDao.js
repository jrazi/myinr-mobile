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
            user = await serverGateway.fetchUserInfo(userMeta.userId);
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

    async saveAccessToken(token) {
        let savedToken = await this.rootRepository.saveAccessToken(token);
        return savedToken;
    }

    async getAccessToken() {
        let token = await this.rootRepository.getAccessToken();
        return token;
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
            .then(darkMode => !(darkMode == 'false'));
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

    async logout() {
        await AsyncStorage.clear();
        this.user = null;
        this.tempLastUpdate = new Date('2018-01-01').getTime()/1000;
    }
}

export const rootDao = new RootDao();
