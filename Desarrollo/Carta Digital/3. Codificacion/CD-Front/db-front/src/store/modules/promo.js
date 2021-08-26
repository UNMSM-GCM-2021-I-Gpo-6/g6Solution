import api from '@/services/api'

export const namespaced = true

export const state = {
  promos: [],
}

export const getters = {}

export const mutations = {
  ADD_PROMO(state, promo) {
    state.promos.push(promo)
  },
  SET_PROMOS(state, promos) {
    state.promos = promos
  },
}

export const actions = {
  updatePromo({ dispatch }, payload) {
    return api
      .putPromotion(payload)
      .then(() => {
        const notification = {
          type: 'success',
          message: `Promoción actualizada correctamente.`,
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'danger',
          message:
            'A ocurrido un error actualizando la promoción: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  deletePromo({ dispatch }, id) {
    return api
      .deletePromotion(id)
      .then(() => {
        const notification = {
          type: 'success',
          message: `Promoción eliminada correctamente.`,
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'danger',
          message:
            'A ocurrido un error eliminando la promoción: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchPromos({ commit, dispatch }) {
    return api
      .getPromotions()
      .then((r) => {
        // console.log(r)
        commit('SET_PROMOS', r.data)
      })
      .catch((error) => {
        const notification = {
          type: 'danger',
          message:
            'No se pudo obtener la lista de promociones: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  createPromo({ commit, dispatch }, promo) {
    return api
      .postPromotion(promo)
      .then((r) => {
        commit('ADD_PROMO', r.data)
        const notification = {
          type: 'success',
          message: `${r.data.name} agregado correctamente!`,
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'danger',
          message: 'A ocurrido un error creando la promoción: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
}
