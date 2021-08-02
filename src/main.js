import Vue from 'vue'
import App from './App.vue'

//add vue router
import router from "./routes/router";

//add global scss styles
import '../src/assets/app.scss'

//add font to project
import '../src/assets/webfonts/css/fontiran.scss'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
