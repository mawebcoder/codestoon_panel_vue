import Vue from 'vue'
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store/store";

Vue.use(VueRouter)


const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior() {
        return {
            x: 0,
            y: 0,
            behavior: 'smooth'
        }
    }
})
router.beforeEach((to, from, next) => {
    store.state.loader = true;
    store.state.uuid = null;
    store.state.uploadedImages = {};
    store.state.uploadedVideo = null;
    store.state.uploadedZip = null;
    store.state.videoUploadProgress = 0;
    store.state.zipUploadProgress = 0;
    next();
})

router.afterEach(() => {
    store.state.loader = false;
})


export default router;