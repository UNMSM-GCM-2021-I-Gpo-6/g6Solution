import api from '@/services/api'

export const namespaced = true

export const state = {
  token: false
}

export const getters = {}

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  }
}

export const actions = {
  loginUser({ commit, dispatch }, payload) {
    return api
      .loginUser(payload)
      .then(r => {
        commit('SET_TOKEN', r.data.token)
        localStorage.setItem('jwt', r.data.token)
        const notification = {
          type: 'success',
          message: `Bienvenido ${payload.username.charAt(0).toUpperCase() +
            payload.username.slice(1)}!`
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        console.log(error)
        const notification = {
          type: 'danger',
          message: 'A ocurrido un error al ingresar: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  }
}
