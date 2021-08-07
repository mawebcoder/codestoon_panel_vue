import HttpVerbs from "../HttpVerbs";
import store from "../../store/store";

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

        return HttpVerbs.postRequest(`${this.authBaseUrl}/code/expire/date`, data)
    }

    resendCode() {
        let data = {
            security_temporary_password: localStorage.getItem('temp_password')
        }
        return HttpVerbs.postRequest(`${this.authBaseUrl}/code/resend`, data)

    }

    verifyCode(data) {

        return HttpVerbs.postRequest(`${this.authBaseUrl}/login/verify`, data)

    }

    storeUserInformation(response) {
        let data = response.data.data;
        store.state.permissions = data.user_permissions;
        store.state.user_info = data.user;
        store.state.user_role = data.user_role
    }

    permissionVerification(user_permissions, requiredPermission) {

        let en_name_permissions = user_permissions.map(item => {
            return item.name;
        })

        return en_name_permissions.includes(requiredPermission);
    }

    checkCanAccessThisRoute(next, required_permissions) {

        HttpVerbs.getRequest(`${this.authBaseUrl}/user-info`)

            .then(response => {

                this.storeUserInformation(response)

                let result = this.permissionVerification(store.state.permissions, required_permissions)

                result ?
                    next() :
                    next({name: 'auth-login'})

            }).catch(() => {

            next({name: 'auth-login'});

        })

    }
}

export default new Auth('auth')