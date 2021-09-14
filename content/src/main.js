import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'mint-ui/lib/style.css'
import { Button } from 'mint-ui';

Vue.component(Button.name, Button);

//引入mock服务器模块
import './mock/mockServer'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
