import Vue from 'vue'
import App from './App.vue'

//add vue router
import router from "./routes/router";

//add global scss styles
import '../src/assets/app.scss'

//add font to project
import '../src/assets/webfonts/css/fontiran.scss'

import {MdIcon} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(MdIcon)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
