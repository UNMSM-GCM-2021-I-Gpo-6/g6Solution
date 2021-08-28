import api from '@/services/api'

export const namespaced = true

export const state = {
  token: false || localStorage.getItem('jwt')
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
      .then((r) => {
        console.log(r);
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
  },

  logoutUser({ commit, dispatch }) {
    commit('SET_TOKEN', false)
    localStorage.clear()
    localStorage.removeItem('jwt')
    const notification = {
      type: 'success',
      message: 'Cierre de sesión exitosa'
    }
    dispatch('notification/add', notification, { root: true })
  },

  registerUser({ dispatch }, payload) {
    return api
      .registerUser(payload)
      .then((r) => {
        console.log(r);
        const notification = {
          type: 'success',
          message: `${r.data.message}`
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        console.log(error);
        const notification = {
          type: 'danger',
          message: 'A ocurrido un error al registrar usuario: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  }
}
