import HttpVerbs from "../HttpVerbs";
class ArticleTagService {

    constructor(articleTagBaseUrl) {
        this.articleTagBaseUrl = articleTagBaseUrl;
    }

    store(data) {

        return  HttpVerbs.postRequest(`${this.articleTagBaseUrl}`,data)

    }

    getTagsForSelectBox(){
        return HttpVerbs.getRequest(`${this.articleTagBaseUrl}/select-box`)
    }
}

export default new ArticleTagService('articles/tags')