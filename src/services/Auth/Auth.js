import HttpVerbs from "../HttpVerbs";

class Auth {

    constructor(authBaseUrl) {
        this.authBaseUrl = authBaseUrl;
    }

    login(data) {
        return HttpVerbs.postRequest(`${this.authBaseUrl}/login`, data)
    }

    verifyTempPassword() {

        let data = {
            security_temporary_password: localStorage.getItem('temp_password')
        }

        return HttpVerbs.postRequest(`${this.authBaseUrl}/login/validate-security-temporary-password`, data)
    }

    getExpireCodeDate() {

        let data = {
            security_temporary_password: localStorage.getItem('temp_password')
        }

        return  HttpVerbs.postRequest(`${this.authBaseUrl}/code/expire/date`, data)
    }

    resendCode() {
        let data = {
            security_temporary_password: localStorage.getItem('temp_password')
        }
        return  HttpVerbs.postRequest(`${this.authBaseUrl}/code/resend`, data)

    }

    verifyCode(data) {

        return  HttpVerbs.postRequest(`${this.authBaseUrl}/login/verify`, data)

    }

    checkLogin() {

        return  HttpVerbs.postRequest(`${this.authBaseUrl}/user-info`)

    }
}

export default new Auth('auth')