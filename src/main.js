import Vue from 'vue'
import App from './App.vue'
// vuex
import store from "./store/store";

//add vue router
import router from "./routes/router";

//add global scss styles
import '../src/assets/app.scss'

//add font to project
import '../src/assets/webfonts/css/fontiran.scss'


import {MdIcon,MdButton,MdField,MdAutocomplete,MdBadge,MdProgress} from 'vue-material/dist/components'
// import {MdButton} from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(MdIcon)
Vue.use(MdField)
Vue.use(MdBadge)
Vue.use(MdAutocomplete)
Vue.use(MdProgress)
Vue.use(MdButton)
Vue.config.productionTip = false

new Vue({

    store,
    router,
    render: h => h(App),

}).$mount('#app')
