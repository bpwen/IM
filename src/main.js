import Vue from 'vue'
import './config/import'
import store from './store'
import router from './router'
import App from './App.vue'
import './IM'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')