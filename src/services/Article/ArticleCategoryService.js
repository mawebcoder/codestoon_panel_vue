import HttpVerbs from "../HttpVerbs";
class ArticleCategoryService{

    constructor(articleCategoryBaseUrl) {
        this.articleCategoryBaseUrl=articleCategoryBaseUrl;
    }
    getParents(){
        return HttpVerbs.getRequest(`${this.articleCategoryBaseUrl}/select-box`)
    }
    store(data){
        return HttpVerbs.postRequest(this.articleCategoryBaseUrl,data)
    }
}
export default new ArticleCategoryService('articles/categories');