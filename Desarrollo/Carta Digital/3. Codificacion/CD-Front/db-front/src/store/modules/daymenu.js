import api from '@/services/api'

export const namespaced = true

export const state = {
  daymenu: [],
}

export const getters = {}

export const mutations = {
  SET_PROGRAMING(state, daymenu) {
    state.daymenu = daymenu
  },
  ADD_DISH(state, payload) {
    let index = state.daymenu.findIndex((item) => item._id == payload.id)
    state.daymenu[index][payload.dish].push(payload.data)
  },
  DELETE_DISH(state, payload) {
    let index = state.daymenu.findIndex((item) => item._id == payload.id)
    let index2 = state.daymenu[index][payload.dish].findIndex(
      (item) => item == payload.data
    )
    state.daymenu[index][payload.dish].splice(index2, 1)
  },
  UPDATE_DISH(state, payload) {
    let index = state.daymenu.findIndex((item) => item._id == payload.id)
    let index2 = state.daymenu[index][payload.dish].findIndex(
      (item) => item == payload.data.oldDish
    )
    state.daymenu[index][payload.dish][index2] = payload.data.newDish
  },
}

export const actions = {
  fetchPrograming({ commit, dispatch }) {
    return api
      .getPrograming()
      .then((r) => {
        // console.log(r.data)
        commit('SET_PROGRAMING', r.data)
      })
      .catch((error) => {
        throw error
      })
  },

  updateDish({ commit, dispatch }, payload) {
    return api
      .putDishToProgram(payload)
      .then((r) => {
        // console.log(r)
        commit('UPDATE_DISH', payload)
        const notification = {
          type: 'success',
          message: `Plato ${r.data.name} actualizado correctamente!`,
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'danger',
          message:
            'A ocurrido un error al actualizar el plato: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },

  deleteDish({ commit, dispatch }, payload) {
    return api
      .deleteDishToProgram(payload)
      .then(() => {
        commit('DELETE_DISH', payload)
        const notification = {
          type: 'success',
          message: `Plato ${payload.data.name} eliminado correctamente!`,
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'danger',
          message: 'A ocurrido un error al eliminar el plato: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },

  createDish({ commit, dispatch }, payload) {
    return api
      .postDishToProgram(payload)
      .then((r) => {
        commit('ADD_DISH', payload)
        const notification = {
          type: 'success',
          message: `Plato ${r.data.name} agregado correctamente!`,
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'danger',
          message: 'A ocurrido un error creando el plato: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
}
