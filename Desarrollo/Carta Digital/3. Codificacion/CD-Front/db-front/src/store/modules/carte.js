import api from '@/services/api'

export const namespaced = true

export const state = {
  carte: [],
}

export const getters = {}

export const mutations = {
  SET_CARTE(state, carte) {
    state.carte = carte
  },
  ADD_DISH(state, dish) {
    let index = state.carte.findIndex((item) => item._id == dish.id)
    state.carte[index].dishes.push(dish.data)
  },
  DELETE_DISH(state, dish) {
    console.log(dish)
    let index = state.carte.findIndex((item) => item._id == dish.id)
    console.log(index)
    let index2 = state.carte[index].dishes.findIndex(
      (item) => item.name == dish.data.name
    )
    console.log(index2)
    state.carte[index].dishes.splice(index2, 1)
  },
  UPDATE_DISH(state, dish) {
    let index = state.carte.findIndex((item) => item._id == dish.id)
    let index2 = state.carte[index].dishes.findIndex(
      (item) => item == dish.data.oldDish
    )
    state.carte[index].dishes[index2] = dish.data.newDish
  },
}

export const actions = {
  fetchCarte({ commit, dispatch }) {
    return api
      .getDishes()
      .then((r) => {
        // console.log(r.data)
        commit('SET_CARTE', r.data)
      })
      .catch((error) => {
        throw error
      })
  },

  deleteDish({ commit, dispatch }, dish) {
    return api
      .deleteDish(dish)
      .then(() => {
        commit('DELETE_DISH', dish)
        const notification = {
          type: 'success',
          message: `Plato ${dish.data.name} eliminado correctamente!`,
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

  updateDish({ commit, dispatch }, dish) {
    return api
      .putDish(dish)
      .then((r) => {
        // console.log(r)
        commit('UPDATE_DISH', dish)
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

  createDish({ commit, dispatch }, dish) {
    return api
      .postDish(dish)
      .then((r) => {
        commit('ADD_DISH', dish)
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
