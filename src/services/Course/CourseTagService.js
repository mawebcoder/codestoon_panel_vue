import HttpVerbs from "../HttpVerbs";
class CourseTagService{
    constructor(courseCategoryBaseUrl) {
        this.courseCategoryBaseUrl=courseCategoryBaseUrl;
    }

    getTags(){
        return HttpVerbs.getRequest(`${this.courseCategoryBaseUrl}/select/box`)
    }
}
export default new CourseTagService('courses/tags');