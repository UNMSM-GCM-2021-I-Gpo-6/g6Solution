import Vue from 'vue'
import Vuex from 'vuex'

import * as login from '@/store/modules/login'
import * as notification from '@/store/modules/notification'

import * as promo from '@/store/modules/promo'
import * as carte from '@/store/modules/carte'
import * as categorie from '@/store/modules/categorie'
import * as daymenu from '@/store/modules/daymenu'
import * as menu from '@/store/modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    notification,
    login,
    carte,
    promo,
    categorie,
    daymenu,
    menu,
  },
})
