import HttpVerbs from "../HttpVerbs";
class CourseTagService{
    constructor(courseTagBaseUrl) {
        this.courseTagBaseUrl=courseTagBaseUrl;
    }

    getTags(){
        return HttpVerbs.getRequest(`${this.courseTagBaseUrl}/select/box`)
    }
    store(data){
        return HttpVerbs.postRequest(`${this.courseTagBaseUrl}`,data)
    }
}
export default new CourseTagService('courses/tags');