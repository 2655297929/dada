import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
  userInfo:{},
}

const mutations = {
  RECEIVE_USER_INFO(state,{userInfo}) {
    state.userInfo =userInfo
  },
  RECEIVE_USER_INFO(state){
    state.userInfo ={}
  }
}

const actions = {

}

export default new Vuex.state({
  state,
  mutations,
  actions,
})