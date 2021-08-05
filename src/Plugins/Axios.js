import axios from "axios";
import store from "../store/store";
import Vue from "vue";

axios.defaults.baseURL = store.state.baseUrl;
axios.defaults.headers.common['Authorization'] = `Bearer ${Vue.$cookies.get('token')}`;