<template>
  <div id="app">
    <NotificationContainer />
    <section class="section">
      <div class="container" :class="{ columns: isLogged }">
        <!-- commit de prueba -->
        <MenuBar v-if="isLogged" class="column is-one-quarter" />
        <router-view :class="{ column: isLogged }" />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MenuBar from '@/components/MenuBar'
import NotificationContainer from '@/components/NotificationContainer'

export default {
  components: {
    MenuBar,
    NotificationContainer,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      token: (state) => state.login.token,
    }),
    isLogged() {
      return this.token
    },
  },
}
</script>

<style lang="scss">
$primary: #ca9e66;

@import 'bulma/bulma.sass';
.svg-inline {
  height: 1em;
}
</style>
