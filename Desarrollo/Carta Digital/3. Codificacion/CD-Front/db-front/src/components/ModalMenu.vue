<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <div v-show="item.photo" class="field">
          <figure class="image">
            <img :src="item.photo" class="modal__img" />
          </figure>
        </div>
        <div class="field">
          <label class="label">Nombre</label>
          <div class="control">
            <input
              v-model="item.name"
              class="input"
              type="text"
              placeholder="Nombre del menu"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Precio</label>
          <div class="control has-icons-left">
            <input
              v-model.number="item.price"
              class="input"
              type="text"
              placeholder="Precio del menu"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user">S/ </i>
            </span>
          </div>
        </div>

        <div class="field">
          <div class="file has-name">
            <label class="file-label">
              <input
                class="file-input"
                type="file"
                name="resume"
                accept="image/png, image/jpeg"
                ref="photo"
                @change="handleFileChange"
              />
              <span class="file-cta">
                <span class="file-label"> 🠉 Nueva imagen... </span>
              </span>
              <span class="file-name">
                {{ selectedImgName }}
              </span>
            </label>
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-link"
              :class="{ 'is-loading': loading }"
              @click="dispatchMenu()"
              :disabled="!isDisabled"
            >
              {{ isNewMenu }} menú
            </button>
          </div>
          <div class="control">
            <button
              class="button is-link is-light"
              @click="$emit('closeModal')"
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
      @click="$emit('closeModal')"
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
      formData: null,
      selectedImgName: 'Ninguna seleccionada',
    }
  },
  computed: {
    isNewMenu() {
      return this.item.newMenu ? 'Crear' : 'Actualizar'
    },
    isDisabled() {
      return this.item.newMenu
        ? this.item.name &&
            this.item.price &&
            new Boolean(this.item.fileImg).valueOf()
        : this.item.name && this.item.price
    },
  },
  methods: {
    ...mapActions({
      createMenu: 'menu/createMenu',
      updateMenu: 'menu/updateMenu',
    }),
    prepareFormData() {
      this.formData = new FormData()
      this.formData.append('name', this.item.name)
      this.formData.append('price', this.item.price)
      this.formData.append('photo', this.item.fileImg)
    },
    handleFileChange() {
      this.item.fileImg = this.$refs.photo.files[0]
      this.selectedImgName = this.$refs.photo.files[0].name
      this.item.photo = null
    },
    dispatchMenu() {
      if (this.item.newMenu) {
        this.prepareFormData()
        this.loading = true
        this.createMenu(this.formData)
          .then(() => {
            this.loading = false
            this.$emit('closeModal')
          })
          .catch((e) => console.log(e))
      } else {
        this.prepareFormData()
        this.loading = true
        this.updateMenu({
          id: this.item._id,
          data: this.formData,
        }).then(() => {
          this.loading = false
          this.$emit('closeModal', 'update')
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.modal__img {
  width: auto;
  margin: 0 auto;
}
</style>
