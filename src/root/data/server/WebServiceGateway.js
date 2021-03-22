import StupidButRealServerGateway from "./StupidServer";
import {ErrorType, getErrorType} from "./errors";
import {DEFAULT_TIMEOUT, withTimeout} from "./util";
import {fetchUniqueRecord} from "./Sql";

const SERVER_ADDRESS = "http://192.168.0.100:3000";
const API_PATH = `${SERVER_ADDRESS}/api/v1`;

export default class WebServiceGateway extends StupidButRealServerGateway {

    fetchUserDataWithLogin(username, password) {
        let url = `${API_PATH}/auth/login?`;
        let params = {username: username, password: password}
        url += new URLSearchParams(params).toString();


        return withTimeout(DEFAULT_TIMEOUT, function() {
            return fetch(url, {
                method: 'GET',
                params: {
                    username: username,
                    password: password,
                }
            })
                .then(async res => {
                    const resData = await res.json();
                    if (res.ok) return resData;
                    else throw resData;
                })
                .then(res => res.data)
                .catch(err => {
                    console.log('API Error', err);
                    throw err;
                })
        }(), )
    }

}
