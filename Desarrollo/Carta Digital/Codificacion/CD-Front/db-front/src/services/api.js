import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URI,
  withCredentials: false, //This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
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
    return apiClient.post('/signin', data)
  }
}
