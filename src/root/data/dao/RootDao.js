import RootRepository from "../repository/RootRepository";
import MockServerGateway from "../server/MockServerGateway";
import {Locale} from "../../domain/Locale";

export class RootDao {

    constructor() {
        this.rootRepository = new RootRepository();
        this.server = new MockServerGateway();
    }

    async getUser() {
        let user = await this.rootRepository.getUser();
        if (user != null) return user;

        let userMeta = await this.getUserMetaData();
        if (userMeta == null) return null;

        user = await this.server.fetchUserData(userMeta.username);
        return user;
    }

    async getUserMetaData() {
        return await this.rootRepository.getUserMetaData();
    }

    async saveUser(user) {
        return await this.rootRepository.saveUser(user);
    }

    getLocale() {
        return Locale.FA;
    }
}

export const rootDao = new RootDao();
