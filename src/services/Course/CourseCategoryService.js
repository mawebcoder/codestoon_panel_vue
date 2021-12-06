import HttpVerbs from "../HttpVerbs";

class CourseCategoryService {

    constructor(courseCategoryBaseUrl) {
        this.courseCategoryBaseUrl = courseCategoryBaseUrl;
    }

    storeCourseCategory(data) {

        return HttpVerbs.postRequest(`${this.courseCategoryBaseUrl}`, data)
    }

    getSelectBox(courseCategory = null) {

        if (courseCategory) {
            return HttpVerbs.getRequest(`${this.courseCategoryBaseUrl}/select/box/${courseCategory}`)
        }
        return HttpVerbs.getRequest(`${this.courseCategoryBaseUrl}/select/box`)

    }


}

export default new CourseCategoryService('courses/categories');
