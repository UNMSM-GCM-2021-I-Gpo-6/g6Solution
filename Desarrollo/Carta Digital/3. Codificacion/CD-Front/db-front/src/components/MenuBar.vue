<template>
  <aside class="menu">
    <p class="menu-label">Administración</p>
    <ul class="menu-list">
      <li><router-link to="/">Promociones</router-link></li>
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
        <router-link to="/">Carta</router-link>
        <ul>
          <li><router-link to="/">Categorías</router-link></li>
          <li><router-link to="/">Platos</router-link></li>
        </ul>
      </li>
      <!--  -->
      <li>
        <router-link to="/">Menú</router-link>
        <ul>
          <li><router-link to="/">Programación</router-link></li>
          <li><router-link to="/">Menúes</router-link></li>
        </ul>
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
