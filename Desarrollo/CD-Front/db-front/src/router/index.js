import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login'
import Signup from '@/views/Signup'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },{
    path: '/signup',
    name: 'signup',
     component: Signup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
