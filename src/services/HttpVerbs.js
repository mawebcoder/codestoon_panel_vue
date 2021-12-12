import axios from "axios";
import Vue from "vue";
import store from "../store/store";

class HttpVerbs {

    getRequest(uri) {

        return axios.get(uri, {
            headers: {
                Authorization: `Bearer ${Vue.$cookies.get('token')}`
            }
        })

    }

    postRequest(uri, data = null,showLoading=true) {

        if (showLoading){
            store.state.loader = true;
        }

        return data ?
            axios.post(uri, data, {
                headers: {
                    Authorization: `Bearer ${Vue.$cookies.get('token')}`
                }
            }) :
            axios.post(uri, {}, {
                headers: {
                    Authorization: `Bearer ${Vue.$cookies.get('token')}`
                }
            })
    }

    putRequest(uri, data = new FormData()) {

        store.state.loader = true;

        data.append('_method', 'PUT')

        return axios.post(uri, data, {
            headers: {
                Authorization: `Bearer ${Vue.$cookies.get('token')}`
            }
        })
    }

    patchRequest(uri, data = new FormData()) {

        data.append('_method', 'PATCH')

        return axios.post(uri, data, {
            headers: {
                Authorization: `Bearer ${Vue.$cookies.get('token')}`
            }
        })
    }

    deleteRequest(uri, data = {}) {

        store.state.loader = true;

        Object.assign(data, {_method: 'DELETE'})

        return axios.post(uri, data, {
            headers: {
                Authorization: `Bearer ${Vue.$cookies.get('token')}`
            }
        })
    }
}

export default new HttpVerbs();
