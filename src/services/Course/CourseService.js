import HttpVerbs from "../HttpVerbs";

class CourseService {

    constructor(baseUrl) {
        this.courseBaseurl = baseUrl;
    }

    store(data) {
      return   HttpVerbs.postRequest(this.courseBaseurl, data);
    }
}

export default new CourseService('courses')