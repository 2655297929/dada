import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: 0
}
const mutations = {
    INCREMENT(state) { state.count++ },
    DECREMENT(state) { state.count-- },
}

const actions = {
    increment({ commit }) { commit("INCREMENT") },
    decrement({ commit }) { commit("DECREMENT") },
    incrementIfOdd({ commit, state }) {
        commit("INCREMENT")
        if (state.count % 2 == 1) { commit("INCREMENT") }
    },
    incrementAsync({ commit, state }) {
        commit("DECREMENT")
        setTimeout(() => commit("DECREMENT"), 30)
    }
}
export default new Vuex.Store({ state, mutations, actions })