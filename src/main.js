import Vue from 'vue'
import App from './App.vue'

require('./Plugins/VueNoty')

//dropZon

require('./Plugins/dropzone')

require('persian-rex')

// vue cookies
require('./Plugins/VueCookies')

// date picker
require('./Plugins/datePicker')

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

import 'vue-multiselect/dist/vue-multiselect.min.css'
import 'vue-multiselect/dist/vue-multiselect.min.js'

new Vue({

    store,
    router,
    render: h => h(App),

}).$mount('#app')
