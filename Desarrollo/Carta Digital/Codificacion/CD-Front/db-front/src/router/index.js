import Vue from 'vue'
import VueRouter from 'vue-router'

import Carta from '@/views/Carta'
import Categories from '@/views/Categories'
import DayMenu from '@/views/DayMenu'
import Menues from '@/views/Menues'
import Promo from '@/views/Promo'

import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/daymenu',
    name: 'daymenu',
    component: DayMenu,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/carta',
    name: 'carta',
    component: Carta,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/categories',
    name: 'categories',
    component: Categories,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/menues',
    name: 'menues',
    component: Menues,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/promo',
    name: 'promo',
    component: Promo,
    meta: {
      requiresAuth: true
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
