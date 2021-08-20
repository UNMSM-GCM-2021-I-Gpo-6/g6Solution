import api from '@/services/api'

export const namespaced = true

export const state = {
  categories: [],
}

export const getters = {}

export const mutations = {
  ADD_CATEGORIE(state, payload) {
    state.categories.push(payload)
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
}

export const actions = {
  updateCategorie({ dispatch }, payload) {
    return api
      .putCategorie(payload)
      .then(() => {
        const notification = {
          type: 'success',
          message: `Categoría actualizada correctamente.`,
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'danger',
          message:
            'A ocurrido un error actualizando la categoría: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  deleteCategorie({ dispatch }, payload) {
    return api
      .deleteCategorie(payload)
      .then(() => {
        const notification = {
          type: 'success',
          message: `Categoría eliminada correctamente.`,
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'danger',
          message:
            'A ocurrido un error eliminando la categoría: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchCategories({ commit, dispatch }) {
    return api
      .getCategories()
      .then((r) => {
        // console.log(r)
        commit('SET_CATEGORIES', r.data)
      })
      .catch((error) => {
        const notification = {
          type: 'danger',
          message:
            'No se pudo obtener la lista de categorías: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  createCategorie({ commit, dispatch }, categorie) {
    return api
      .postCategorie(categorie)
      .then((r) => {
        // console.log(r)
        commit('ADD_CATEGORIE', r.data)
        const notification = {
          type: 'success',
          message: `Categoría ${categorie.get('name')} agregada correctamente!`,
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'danger',
          message: 'A ocurrido un error creando la categoría: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
}
