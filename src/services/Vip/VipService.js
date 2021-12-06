import HttpVerbs from "../HttpVerbs";
class VipService{

    constructor(baseUrl) {
        this.baseUrl=baseUrl;
    }

    store(data){

        return HttpVerbs.postRequest(this.baseUrl,data);

    }
}
export default new VipService('vip');