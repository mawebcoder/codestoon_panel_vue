import axios from "axios";
import store from "../store/store";
axios.defaults.baseURL = store.state.baseUrl;