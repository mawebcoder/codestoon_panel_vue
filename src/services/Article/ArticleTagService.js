import axios from "axios";

class ArticleTagService {

    constructor(articleTagBaseUrl) {
        this.articleTagBaseUrl = articleTagBaseUrl;
    }


    store(data) {

        return axios.post(`${this.articleTagBaseUrl}`, data)

    }
}

export default new ArticleTagService('articles/tags')