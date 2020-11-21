import {AsyncStorage} from "react-native";
import UserFactory from "../../domain/UserFactory";

const USER_META_KEY = 'USER_METADATA';

export default class RootRepository {

    constructor() {
    }

    async saveUser(user) {
        user = user.serialize();
        try {
            await AsyncStorage.setItem(
                user.username,
                JSON.stringify(user)
            );
            await AsyncStorage.setItem(
                USER_META_KEY,
                JSON.stringify({username: user.username})
            );
        } catch (error) {
            return;
        }
    }

    async getUser() {
        try {
            let userMetaData = await this.getUserMetaData();
            let userInfo = await AsyncStorage.getItem(userMetaData.username);
            return UserFactory.createUser(JSON.parse(userInfo));
        } catch (error) {
            return null;
        }
    }

    async getUserMetaData() {
        try {
            let data = await AsyncStorage.getItem(USER_META_KEY);
            return JSON.parse(data);
        } catch (error) {
            return null;
        }
    }
}
