import axios from "axios";

class Auth {

    constructor(authBaseUrl) {
        this.authBaseUrl = authBaseUrl;
    }

    login(data) {
        return axios.post(`${this.authBaseUrl}/login`, data)
    }

    verifyTempPassword() {

        let data = {
            security_temporary_password: localStorage.getItem('temp_password')
        }

        return axios.post(`${this.authBaseUrl}/login/validate-security-temporary-password`, data)
    }

    getExpireCodeDate() {

        let data = {
            security_temporary_password: localStorage.getItem('temp_password')
        }

        return axios.post(`${this.authBaseUrl}/code/expire/date`, data)
    }

    resendCode() {
        let data = {
            security_temporary_password: localStorage.getItem('temp_password')
        }
        return axios.post(`${this.authBaseUrl}/code/resend`, data)


    }

    verifyCode(data) {

        return axios.post(`${this.authBaseUrl}/login/verify`, data)

    }
}

export default new Auth('auth')