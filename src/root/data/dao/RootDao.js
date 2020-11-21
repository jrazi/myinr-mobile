import RootRepository from "../repository/RootRepository";
import MockServerGateway from "../server/MockServerGateway";

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
}

export const rootDao = new RootDao();
