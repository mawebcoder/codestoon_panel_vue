import axios from "axios";

class Auth {

    constructor(authBaseUrl) {
        this.authBaseUrl = authBaseUrl;
    }

    login(data) {
        return axios.post(`${this.authBaseUrl}/login`, data)
    }
}

export default new Auth('auth')