import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://app-food-api.herokuapp.com/api',
  withCredentials: false, //This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // timeout: 10000
})

// apiClient.interceptors.request.use(
//   config =>
//     new Promise(resolve => {
//       setTimeout(() => {
//         console.log('GAAAA')
//         config.headers.async = 'promise'
//         resolve(config)
//       }, 3000)
//     })
// )

export default {
  //logueo
  loginUser(data) {
    return apiClient.post('/login', data)
  },
  //registro
  registerUser(data) {
    return apiClient.post('/signup', data)
  },
  //
  //categorías de los menues
  getMenues() {
    return apiClient.get('/menues')
  },
  postMenu(data) {
    return apiClient.post('/menu', data)
  },
  putMenu({ id, data }) {
    return apiClient.put(`/menu/${id}`, data)
  },
  deleteMenu(id) {
    return apiClient.delete(`/menu/${id}`)
  },
  //programacion del menu
  getPrograming() {
    return apiClient.get('/programing')
  },
  postDishToProgram({ id, dish, data }) {
    return apiClient.post(`/programing/${id}/${dish}`, data)
  },
  deleteDishToProgram({ id, dish, data }) {
    // console.log(id, dish, data)
    return apiClient.delete(`/programing/${id}/${dish}`, { data })
  },
  putDishToProgram({ id, dish, data }) {
    return apiClient.put(`/programing/${id}/${dish}`, data)
  },
  //platos de la carta
  getDishes() {
    return apiClient.get('/carte')
  },
  postDish({ id, data }) {
    return apiClient.post(`/carte/${id}`, data)
  },
  putDish({ id, data }) {
    return apiClient.put(`/carte/${id}`, data)
  },
  deleteDish({ id, data }) {
    return apiClient.delete(`/carte/${id}`, { data })
  },

  //categorias de la carta
  getCategories() {
    return apiClient.get('/categories')
  },
  postCategorie(payload) {
    return apiClient.post('/categorie', payload)
  },
  putCategorie({ id, data }) {
    return apiClient.put(`/categorie/${id}`, data)
  },
  deleteCategorie(id) {
    return apiClient.delete(`/categorie/${id}`)
  },

  //promociones
  getPromotions() {
    return apiClient.get('/promos')
  },
  postPromotion(payload) {
    return apiClient.post('/promo', payload)
  },
  putPromotion({ id, data }) {
    return apiClient.put(`/promo/${id}`, data)
  },
  deletePromotion(id) {
    return apiClient.delete(`/promo/${id}`)
  },
}
