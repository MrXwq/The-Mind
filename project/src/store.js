import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户id
    userId: '',
    
  },
  mutations: {
    // 普通用户登录
    USER_LOGIN: (state, arg) => {
      state.userId = arg.userId
    },
    
  },
  actions: {
    // 普通用户登录
    userLogin({ commit }, args) {
      commit('USER_LOGIN', args)
    }
  }
})
