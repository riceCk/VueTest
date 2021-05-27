import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker'
import router from './router'
import store from './store'
import backend from './utils/backend';
import api from './conf/api/index';
import vcolorpicker from 'vcolorpicker'
import echarts from 'echarts'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import VueExcelEditor from 'vue-excel-editor'
import vueMsg from 'vue-msg-plugin-ck'



Vue.prototype.$video = Video
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

Object.defineProperty(Vue.prototype, '$backend', {
  get () {
    return backend;
  }
})

Object.defineProperty(Vue.prototype, '$api', {
  get () {
    return api;
  }
})
Vue.use(vcolorpicker)
Vue.use(ElementUI);
Vue.use(VueExcelEditor)
Vue.use(vueMsg)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
