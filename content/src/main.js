import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'mint-ui/lib/style.css'
import { Button } from 'mint-ui';

Vue.component(Button.name, Button);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
