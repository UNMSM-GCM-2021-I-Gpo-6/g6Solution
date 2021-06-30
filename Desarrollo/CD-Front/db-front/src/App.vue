<template>
  <div id="app">
    <section class="section">
      <div class="container" :class="{ columns: isLogged }">
        <router-view :class="{ column: isLogged }" />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      token: (state) => state.login.token,
    }),
    isLogged() {
      return localStorage.getItem('jwt') || this.token
    },
  },
}
</script>

<style lang="scss">
@import 'bulma/bulma.sass';
.svg-inline {
  height: 1em;
}
</style>
