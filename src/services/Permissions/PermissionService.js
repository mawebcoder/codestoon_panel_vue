import HttpVerbs from "../HttpVerbs";

class PermissionService {

    getPermissions() {

        return HttpVerbs.getRequest('roles/permissions');
    }

}

export default new PermissionService();