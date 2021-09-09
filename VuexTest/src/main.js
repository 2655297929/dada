import Vue from 'vue'
import App from './App.vue'
//main.js 引入store.js
import store from './store'
new Vue({
  el:'#app',
  render:h=>h(App),
  store
})