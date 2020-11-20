import {AsyncStorage} from "react-native";
import UserFactory from "../../domain/UserFactory";

const USER_META_KEY = 'USER';

export default class UserRepository {

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
                user.username
            );
        } catch (error) {
            // Error saving data
        }
    }

    async getUser() {
        let user = null;
        try {
            let username = await AsyncStorage.getItem(USER_META_KEY);
            let userInfo = await AsyncStorage.getItem(username);
            user = UserFactory.createUser(JSON.parse(userInfo));
        } catch (error) {
            // Error saving data
        }
        return user;
    }

}
