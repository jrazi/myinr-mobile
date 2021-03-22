import {AsyncStorage} from "react-native";

const USER_META_KEY = 'USER_METADATA';
const TOKEN_KEY = 'ACCESS_TOKEN';

export default class RootRepository {

    constructor() {
    }

    async saveUser(user) {
        try {
            await AsyncStorage.setItem(
                new String(user.userId).toString(),
                JSON.stringify(user)
            );
            await AsyncStorage.setItem(
                USER_META_KEY,
                JSON.stringify({username: user.userInfo.username, userId: user.userId})
            );
        } catch (error) {
            throw error;
        }
    }

    async getUser() {
        try {
            let userMetaData = await this.getUserMetaData();
            let userInfo = await AsyncStorage.getItem(new String(userMetaData.userId).toString());

            // return UserFactory.createUser(JSON.parse(userInfo));
            return JSON.parse(userInfo);
        } catch (error) {
            return null;
        }
    }

    async saveAccessToken(token) {
        try {
            await AsyncStorage.setItem(
                TOKEN_KEY,
                token
            );
            return token;
        } catch (error) {
            return;
        }
    }
    async getAccessToken() {
        try {
            const token = await AsyncStorage.getItem(TOKEN_KEY);
            return token;
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

    async deleteUser() {
        try {
            let user = await this.getUser();
            if (user != null) await AsyncStorage.removeItem(new String(user.userId).toString());
            await AsyncStorage.removeItem(USER_META_KEY);
            await AsyncStorage.removeItem(TOKEN_KEY);
            return user;
        } catch (error) {
            throw error;
        }
    }
}
