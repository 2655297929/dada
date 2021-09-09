import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/msite',//添加默认首页路由
  },
  {
    path: '/login',
    component:Login,
    meta: {showFooter: false}
  },
  {
    path: '/order',
    component:Order,
    meta: {showFooter:true}
  },
  {
    path: '/profile',
    component:Profile,
    meta: {showFooter:true}
  },
  {
    path: '/search',
    component:Search,
    meta: {showFooter:true}
  },
  {
    path: '/msite',
    component:MSite,
    meta: {showFooter:true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
