import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './theme/index.less';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueKonva from 'vue-konva'
import "./assets/all.css"
import "element-ui/lib/theme-chalk/display.css";
import axios from 'axios'
Vue.prototype.$http = axios;
axios.defaults.headers['token'] = localStorage.getItem('token') || ''

Vue.use(VueKonva)
Vue.use(ElementUI);
Vue.use(ViewUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')