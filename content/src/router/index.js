import Vue from 'vue'
import VueRouter from 'vue-router'
//首页组件
import MSite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
//引入商家组件
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRating from '../pages/Shop/ShopRating/ShopRating'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/msite',//添加默认首页路由
  },
  {
    path: '/login',
    component: Login,
    meta: { showFooter: false }
  },
  {
    path: '/order',
    component: Order,
    meta: { showFooter: true }
  },
  {
    path: '/profile',
    component: Profile,
    meta: { showFooter: true }
  },
  {
    path: '/search',
    component: Search,
    meta: { showFooter: true }
  },
  {
    path: '/msite',
    component: MSite, 
    meta: { showFooter: true }
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      { path: '/shop/goods', component: ShopGoods },
      { path: '/shop/ratings', component: ShopRating },
      { path: '/shop/info', component: ShopInfo },
      //默认显示二级路由
      {path:'',redirect:'/shop/goods'}
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
