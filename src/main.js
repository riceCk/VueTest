import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import backend from './utils/backend';

Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$backend', {
  get () {
    return backend;
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
