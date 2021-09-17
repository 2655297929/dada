import Vue from 'vue'
import Vuex from 'vuex'

import { reqUserInfo, reqLogout, reqShopInfo, reqShopGoods } from '../api'

Vue.use(Vuex)

//创建菜品
const state = {
  userInfo: {}, //商家信息对象
  info: {},     //商家信息
  goods: [],    //商家商品列表
  cartFoods: [] //食物列表购物车
}

//创建厨师
const mutations = {
  //接收用户信息,保存至state
  RECEIVE_USER_INFO(state, { userInfo }) {
    state.userInfo = userInfo
  },
  //重置用户信息
  RECEIVE_USER_INFO(state) {
    state.userInfo = {}
  },
  //接收商家信息-
  RECEIVE_INFO(state, { info }) {
    state.info = info
  },
  //接收商家商品列表
  RECEIVE_GOODS(state, { goods }) {
    state.goods = goods
  },
  //定义三个方法操作购物车
  //将购物车某个食物对象数量加一
  INCREMENT_FOOD_COUNT(state, { food }) {
    //判断食物是否有数量属性
    if (!food.count) {
      //如果没有添加属性
      Vue.set(food, "count", 1)  //添加属性 并且支持双向绑定
      //并且将食物保存在购物车中
      state.cartFoods.push(food);
    }else{
      //数量加一
      food.count++;
    }
  }
  //将购物车某个食物对象数量减一
  //清空购物车
}

//创建服务员
const actions = {
  // 获取服务器用户信息并保存登录
  async getUserInfo({ commit }) {
    // 发送请求
    const result = await reqUserInfo();
    // 将用户信息保存vuex code大于零正确
    if (result.code > 0) {
      const userInfo = result.data;
      commit("RECEIVE_USER_INFO", { userInfo });//提交
    }
  },
  //用户退出功能
  async logout({ commit }) {
    //发送请求完成服务器退出任务
    const result = await reqLogout();
    //如果服务器返回正确信息,清除vuex中用户状态数据
    if (result.code === 0) {
      commit("RECEIVE_USER_INFO");
    }
  },
  //获取商家信息
  async getShopInfo({ commit }) {

    const result = await reqShopInfo();
    //如果信息正确
    if (result.code == 0) {
      const info = result.data;
      commit("RECEIVE_INFO", { info })
    }
    //将信息保存到vuex
  },
  async getShopGoods({ commit }) {
    const result = await reqShopGoods();
    //如果信息正确
    if (result.code == 0) {
      const goods = result.data;
      commit("RECEIVE_GOODS", { goods })
    }
    //将信息保存到vuex
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
})