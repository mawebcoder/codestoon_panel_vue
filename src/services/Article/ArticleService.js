import HttpVerbs from "../HttpVerbs";
class ArticleService {

    constructor(ArticlesBaseUrl) {
        this.ArticlesBaseUrl=ArticlesBaseUrl;
    }

    store(data){
        return HttpVerbs.postRequest(this.ArticlesBaseUrl,data);
    }

}
export default new ArticleService('articles');