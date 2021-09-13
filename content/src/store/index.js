import Vue from 'vue'
import Vuex from 'vuex'

import { reqUserInfo,reqLogout } from '../api'

Vue.use(Vuex)

const state = {
  userInfo: {},
}

const mutations = {
  RECEIVE_USER_INFO(state, { userInfo }) {
    state.userInfo = userInfo
  },
  RECEIVE_USER_INFO(state) {
    state.userInfo = {}
  }
}

const actions = {
  // 获取服务器用户信息并保存登录
  async  getUserInfo({ commit }) {
    // 发送请求
    const result = await reqUserInfo();
    // 将用户信息保存vuex
    if(result.code>0){
      const userInfo = result.data;
      commit("RECEIVE_USER_INFO",{userInfo});提交
    }
  },
  //用户退出功能
  async logout({ commit}){
    //发送请求完成服务器退出任务
    const result= await reqLogout();
    //如果服务器返回正确信息,清除vuex中用户状态数据
    if(result.code===0){
      commit("RECEIVE_USER_INFO");
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
})