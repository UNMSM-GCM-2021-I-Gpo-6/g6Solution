<template>
  <div class="login">
    <img src="@/assets/logo.png" class="login__logo" />
    <div class="field has-text-primary mt-3">{{ cptUserTitle }}</div>

    <template v-if="!isUser">
      <div class="field">
        <label class="label">Nombres</label>
        <div class="control has-icons-left">
          <input
            v-model.number="user.nombre"
            class="input"
            type="text"
            placeholder="ej. Luis Martin"
          />
          <span class="icon is-small is-left">
            <BaseIcon name="username" class="svg-inline" />
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Apellidos</label>
        <div class="control has-icons-left">
          <input
            v-model.number="user.apellido"
            class="input"
            type="text"
            placeholder="ej. Chucos Sánchez"
          />
          <span class="icon is-small is-left">
            <BaseIcon name="username" class="svg-inline" />
          </span>
        </div>
      </div>
    </template>

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
      <p v-if="isUser" class="is-size-7 has-text-grey">
        ¿No tiene una cuenta?
        <span class="has-text-primary is-clickable" @click="isUser = !isUser"
          >Regístrese aquí</span
        >
      </p>
      <p v-else class="is-size-7 has-text-grey">
        Si ya tiene una cuenta,
        <span class="has-text-primary is-clickable" @click="isUser = !isUser"
          >Ingrese aquí</span
        >
      </p>
    </div>

    <div class="field mt-3">
      <p class="control">
        <button
          class="button has-background-primary has-text-white"
          :class="{ 'is-loading': loading }"
          @click="login()"
        >
          {{ cptBtnTxt }}
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
        nombre: '',
        apellido: '',
      },
      loading: false,
      isUser: true,
    }
  },
  watch: {
    isUser() {
      this.user.username = ''
      this.user.password = ''
      this.user.nombre = ''
      this.user.apellido = ''
    },
  },
  computed: {
    cptUserTitle() {
      return this.isUser ? 'INICIAR SESIÓN' : 'REGISTRAR USUARIO'
    },
    cptBtnTxt() {
      return this.isUser ? 'Ingresar' : 'Registrar'
    },
  },
  methods: {
    ...mapActions({
      loginUser: 'login/loginUser',
      registerUser: 'login/registerUser',
    }),
    login() {
      this.loading = true
      if (this.isUser)
        this.loginUser(this.user)
          .then(() => {
            this.loading = false
            this.$router.push('/daymenu')
            // this.$router.go()
          })
          .catch((e) => {
            console.log(e)
          })
      else
        this.registerUser(this.user)
          .then(() => {
            this.loading = false
            this.isUser = !this.isUser
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
