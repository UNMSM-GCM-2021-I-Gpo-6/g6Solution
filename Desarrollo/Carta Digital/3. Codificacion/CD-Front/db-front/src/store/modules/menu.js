import api from '@/services/api'

export const namespaced = true

export const state = {
  menues: [],
}

export const getters = {}

export const mutations = {
  ADD_MENU(state, menu) {
    state.menues.push(menu)
  },
  SET_MENUES(state, menues) {
    state.menues = menues
  },
}

export const actions = {
  updateMenu({ dispatch }, payload) {
    return api
      .putMenu(payload)
      .then(() => {
        const notification = {
          type: 'success',
          message: `Menú actualizado correctamente.`,
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'danger',
          message: 'A ocurrido un error actualizando el menú: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  deleteMenu({ dispatch }, id) {
    return api
      .deleteMenu(id)
      .then(() => {
        const notification = {
          type: 'success',
          message: `Menú eliminado correctamente.`,
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'danger',
          message: 'A ocurrido un error eliminando el menú: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchMenues({ commit, dispatch }) {
    return api
      .getMenues()
      .then((r) => {
        // console.log(r)
        commit('SET_MENUES', r.data)
      })
      .catch((error) => {
        const notification = {
          type: 'danger',
          message: 'No se pudo obtener la lista de menúes: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  createMenu({ commit, dispatch }, menu) {
    return api
      .postMenu(menu)
      .then((r) => {
        commit('ADD_MENU', r.data)
        const notification = {
          type: 'success',
          message: `${r.data.name} agregado correctamente!`,
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'danger',
          message: 'A ocurrido un error creando el menu: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
}
