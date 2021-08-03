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
router.beforeEach((to,from ,next) => {
    store.state.loader = true;
    next();
})

router.afterEach((to,from,next)=>{
    store.state.loader = false;
    next()
})


export default router;