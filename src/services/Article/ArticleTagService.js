import HttpVerbs from "../HttpVerbs";
class ArticleTagService {

    constructor(articleTagBaseUrl) {
        this.articleTagBaseUrl = articleTagBaseUrl;
    }


    store(data) {

        return  HttpVerbs.postRequest(`${this.articleTagBaseUrl}`,data)

    }
}

export default new ArticleTagService('articles/tags')