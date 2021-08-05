import Vue from 'vue'
import App from './App.vue'

// vue cookies
require('./Plugins/VueCookies')

// vue good table
require('./Plugins/VueGoodTable')

// axios
require('./Plugins/Axios')

// vue material
require('./Plugins/VueMaterial')

// vuex
import store from "./store/store";

//vue router
import router from "./routes/router";

//global styles
import '../src/assets/app.scss'

//fonts
import '../src/assets/webfonts/css/fontiran.scss'



new Vue({

    store,
    router,
    render: h => h(App),

}).$mount('#app')
