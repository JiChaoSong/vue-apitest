import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './styles/index.scss'
import { allEnums } from './utils/enum'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import ECharts from 'vue-echart'
import Mount from 'moment'
import './icons'
import './plugins/element.js'
import './permissions'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('v-chart', ECharts)

Vue.filter('formatDate', function (value) {
  if (value !== null) {
    return Mount(value).format('YYYY-MM-DD HH:mm:ss')
  }
})

Vue.prototype.allEnums = allEnums

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
