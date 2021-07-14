import Vue from 'vue'
import Vuex from 'vuex'

import * as login from '@/store/modules/login'
import * as notification from '@/store/modules/notification'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    notification,
    login
  },
})
