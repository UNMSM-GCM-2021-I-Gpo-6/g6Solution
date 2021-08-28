<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <div class="field">
          ¿Está usted seguro de eliminar <strong>{{ item.name }}</strong
          >?
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-danger"
              :class="{ 'is-loading': loading }"
              @click="
                $emit('removeItem', item.id)
                loading = true
              "
            >
              Eliminar
            </button>
          </div>
          <div class="control">
            <button
              class="button is-link is-light"
              @click="$emit('closeModalDelete')"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="$emit('closeModalDelete')"
    ></button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['item'],
  data() {
    return {
      loading: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>
