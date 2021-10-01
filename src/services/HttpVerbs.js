import axios from "axios";
import Vue from "vue";

class HttpVerbs {

    getRequest(uri) {

        return axios.get(uri, {
            headers: {
                Authorization: `Bearer ${Vue.$cookies.get('token')}`
            }
        })

    }

    postRequest(uri, data = null) {

        return data ?
            axios.post(uri, data,{
                headers: {
                    Authorization: `Bearer ${Vue.$cookies.get('token')}`
                }
            }) :
            axios.post(uri,{},{
                headers: {
                    Authorization: `Bearer ${Vue.$cookies.get('token')}`
                }
            })
    }

    putRequest(uri, data = null) {

        !data ?
            data = {_method: 'PUT'} :
            Object.assign(data, {_method: 'PUT'})


        return axios.post(uri, data,{
            headers: {
                Authorization: `Bearer ${Vue.$cookies.get('token')}`
            }
        })
    }

    patchRequest(uri, data = null) {
        !data ?
            data = {_method: 'PATCH'} :
            Object.assign(data, {_method: 'PATCH'})


        return axios.post(uri, data,{
            headers: {
                Authorization: `Bearer ${Vue.$cookies.get('token')}`
            }
        })
    }

    deleteRequest(uri, data = null) {

        !data ?
            data = {_method: 'DELETE'} :
            Object.assign(data, {_method: 'DELETE'})

        return axios.post(uri, data,{
            headers: {
                Authorization: `Bearer ${Vue.$cookies.get('token')}`
            }
        })
    }
}

export default new HttpVerbs();