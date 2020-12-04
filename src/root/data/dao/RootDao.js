import RootRepository from "../repository/RootRepository";
import {Locale} from "../../domain/Locale";
import {serverGateway} from "../server/ServerGateway";

export class RootDao {

    constructor() {
        this.rootRepository = new RootRepository();
        this.tempLastUpdate = new Date('2018-01-01').getTime()/1000;
    }

    async getUser() {
        let user = await this.rootRepository.getUser();
        if (!this.tempTimeToUpdate() && user != null) return user;

        let userMeta = await this.getUserMetaData();
        if (userMeta == null) return null;

        user = await serverGateway.fetchUserDataWithUsername(userMeta.username);
        await this.saveUser(user);
        return user;
    }

    async getUserMetaData() {
        return await this.rootRepository.getUserMetaData();
    }

    async saveUser(user) {
        let savedUser = await this.rootRepository.saveUser(user);
        this.tempNewDate();
        return savedUser;
    }

    async deleteUser() {
        let user = await this.rootRepository.deleteUser();
        return user;
    }

    getLocale() {
        return Locale.FA;
    }

    tempNewDate() {
        this.tempLastUpdate = new Date().getTime()/1000;
    }

    tempTimeToUpdate() {
        return (new Date().getTime()/1000) - (this.tempLastUpdate) > (300);
    }
}

export const rootDao = new RootDao();
