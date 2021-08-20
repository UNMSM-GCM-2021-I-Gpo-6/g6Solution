<template>
  <aside class="menu">
    <p class="menu-label">Administración</p>
    <ul class="menu-list">
      <li>
        <router-link
          :to="{ name: 'promo' }"
          :class="{ 'is-active': isActive('promo') }"
          >Promociones</router-link
        >
      </li>
      <!-- <li
        ><router-link
          :to="{ name: 'categories' }"
          :class="{ 'is-active': isActive('categories') }"
          >Categorías</router-link
        ></li
      >
      <li
        ><router-link
          :to="{ name: 'carta' }"
          :class="{ 'is-active': isActive('carta') }"
          >Carta</router-link
        ></li
      > -->
      <!--  -->
      <li>
        <router-link :to="{ name: 'carta' }">Carta</router-link>
        <ul>
          <li>
            <router-link
              :to="{ name: 'categories' }"
              :class="{ 'is-active': isActive('categories') }"
              >Categorías</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'carta' }"
              :class="{ 'is-active': isActive('carta') }"
              >Platos</router-link
            >
          </li>
        </ul>
      </li>
      <!--  -->
      <li>
        <router-link :to="{ name: 'daymenu' }">Menú</router-link>
        <ul>
          <li>
            <router-link
              :to="{ name: 'daymenu' }"
              :class="{ 'is-active': isActive('daymenu') }"
              >Programación</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'menues' }"
              :class="{ 'is-active': isActive('menues') }"
              >Menúes</router-link
            >
          </li>
        </ul>
      </li>
      <!-- registrar usuarios -->
      <li>
        <router-link
          :to="{ name: 'register' }"
          :class="{ 'is-active': isActive('register') }"
          >Registrar usuario</router-link
        >
      </li>
      <!-- salir del sistema -->
      <li>
        <a @click="logout()">Salir</a>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      // activeItem: 'daymenu'
    }
  },
  methods: {
    ...mapActions({
      logoutUser: 'login/logoutUser',
    }),
    isActive(value) {
      return this.$route.name == value
    },
    logout() {
      this.logoutUser()
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  transition: all 0.3s ease-out;
}
</style>
