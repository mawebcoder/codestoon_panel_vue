import axios from "axios";

class HttpVerbs {

    getRequest(uri) {

        return axios.get(uri)

    }

    postRequest(uri, data = null) {

        return data ?
            axios.post(uri, data) :
            axios.post(uri)
    }

    putRequest(uri, data = null) {

        !data ?
            data = {_method: 'PUT'} :
            Object.assign(data, {_method: 'PUT'})


        return axios.post(uri, data)
    }

    patchRequest(uri, data = null) {
        !data ?
            data = {_method: 'PATCH'} :
            Object.assign(data, {_method: 'PATCH'})


        return axios.post(uri, data)
    }

    deleteRequest(uri, data = null) {

        !data ?
            data = {_method: 'DELETE'} :
            Object.assign(data, {_method: 'DELETE'})

        return axios.post(uri, data)
    }
}

export default new HttpVerbs();