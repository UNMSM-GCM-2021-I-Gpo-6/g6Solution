<template>
  <div class="login">
    <img src="@/assets/logo.png" class="login__logo" />
    <div class="field">
      <label class="label">Usuario</label>
      <div class="control has-icons-left">
        <input
          v-model.number="user.username"
          class="input"
          type="text"
          placeholder="Nombre de usuario"
        />
        <span class="icon is-small is-left">
          <BaseIcon name="username" class="svg-inline" />
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Contraseña</label>
      <div class="control has-icons-left">
        <input
          v-model="user.password"
          class="input"
          type="password"
          placeholder="Contraseña"
        />
        <span class="icon is-small is-left">
          <BaseIcon class="svg-inline" name="locker" />
        </span>
      </div>
    </div>

    <div class="field">
      <p class="control">
        <button
          class="button is-info"
          :class="{ 'is-loading': loading }"
          @click="login()"
        >
          Ingresar
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BaseIcon from '@/components/BaseIcon'

export default {
  components: {
    BaseIcon,
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      loading: false,
    }
  },
  methods: {
    ...mapActions({
      loginUser: 'login/loginUser',
    }),
    login() {
      this.loading = true
      this.loginUser(this.user)
        .then(() => {
          this.loading = false
          this.$router.push('/daymenu')
          // this.$router.go()
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__logo {
    height: 4rem;
    margin-bottom: 1.5rem;
  }
}
</style>
