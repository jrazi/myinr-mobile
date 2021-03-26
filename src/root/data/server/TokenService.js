import {AsyncStorage} from "react-native";


export class TokenService {

    static tokenService;

    static getInstance() {
        if (TokenService.tokenService == null)
            TokenService.tokenService = new TokenService();
        return TokenService.tokenService;
    }

    constructor() {
        this.accessToken = null;
    }

    async getAccessToken({force=false, returnNull=false}={}) {
        if (this.accessToken != null && !force)
            return this.accessToken;

        this.accessToken = null;
        const token = await AsyncStorage.getItem('ACCESS_TOKEN');
        if (token != null) {
            this.accessToken = "Bearer " + token;
            return this.accessToken;
        }
        else if (returnNull) return null;
        else return Promise.reject("No valid token was found");

    }
}

