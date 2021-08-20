<template>
  <div>
    <div class="field mb-5">
      <input
        v-model="searchCateg"
        class="input"
        type="text"
        placeholder="Buscar categoría"
      />
    </div>
    <div class="field is-grouped is-grouped-multiline">
      <div v-for="item in filterByName" :key="item._id" class="control">
        <div class="tags has-addons">
          <a
            class="tag is-medium"
            :class="isPeriod(item.period)"
            @click="setToUpdate(item)"
            >{{ item.name }}</a
          >
          <a class="tag is-delete is-medium" @click="setToDelete(item)"></a>
        </div>
      </div>
    </div>

    <button class="button is-info is-outlined mt-3" @click="toogleCatModal()">
      Agregar categoría
    </button>

    <div class="modal" :class="{ 'is-active': modalDelete }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="field">
            ¿Eliminar la categoría <strong>{{ itemToDelete.name }}</strong
            >?
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button
                class="button is-danger"
                :class="{ 'is-loading': loading }"
                @click="removeCategorie(itemToDelete)"
              >
                Eliminar
              </button>
            </div>
            <div class="control">
              <button
                class="button is-link is-light"
                @click="
                  modalDelete = !modalDelete
                  imgURI = null
                "
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
        @click="
          modalDelete = !modalDelete
          imgURI = null
        "
      ></button>
    </div>

    <div class="modal" :class="{ 'is-active': modal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div v-show="imgURI" class="field">
            <figure class="image">
              <img :src="imgURI" class="modal__img" />
            </figure>
          </div>
          <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Nombre de categoría"
                v-model="name"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Horario</label>
            <div class="control">
              <div class="select">
                <select v-model="period">
                  <option value="day">Turno día</option>
                  <option value="night">Turno noche</option>
                  <option value="fullday">Todo el día</option>
                </select>
              </div>
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
                @click="sendData"
                :disabled="!isDisabled"
              >
                {{ isNewCategorie }}
              </button>
            </div>
            <div class="control">
              <button class="button is-link is-light" @click="toogleCatModal()">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="toogleCatModal()"
      ></button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  created() {
    this.fetchCategories()
  },
  data() {
    return {
      searchCateg: '',
      modal: false,
      modalDelete: false,
      itemToDelete: {},
      idToUpdate: null,
      loading: false,
      newCategorie: true,
      //Form Data
      formData: null,
      name: null,
      period: 'day',
      //imagen
      fileImg: null,
      selectedImgName: 'Ninguna seleccionada',
      imgURI: null,
    }
  },
  computed: {
    ...mapState({
      categories: (state) => state.categorie.categories,
    }),
    isNewCategorie() {
      return this.newCategorie ? 'Crear categoría' : 'Actualizar'
    },
    isDisabled() {
      return new Boolean(
        this.newCategorie ? this.name && this.fileImg : this.name
      ).valueOf()
    },
    filterByName() {
      return this.categories.filter((item) =>
        item.name.toLowerCase().includes(this.searchCateg.toLowerCase())
      )
    },
  },
  methods: {
    ...mapActions({
      createCategorie: 'categorie/createCategorie',
      fetchCategories: 'categorie/fetchCategories',
      deleteCategorie: 'categorie/deleteCategorie',
      updateCategorie: 'categorie/updateCategorie',
    }),
    isPeriod(value) {
      if (value == 'day') return 'is-info'
      else if (value == 'night') return 'is-dark'
      else return 'is-primary'
    },
    handleFileChange() {
      // console.log(this.$refs.photo.files[0])
      this.fileImg = this.$refs.photo.files[0]
      this.selectedImgName = this.$refs.photo.files[0].name
      this.imgURI = null
    },
    prepareFormData() {
      this.formData = new FormData()
      this.formData.append('name', this.name)
      this.formData.append('period', this.period)
      this.formData.append('photo', this.fileImg)
    },
    sendData() {
      if (this.newCategorie) {
        this.prepareFormData()
        this.loading = true
        this.createCategorie(this.formData)
          .then(() => {
            this.loading = false
            this.toogleCatModal()
          })
          .catch((e) => console.log(e))
      } else {
        this.prepareFormData()
        this.loading = true
        this.updateCategorie({
          id: this.idToUpdate,
          data: this.formData,
        }).then(() => {
          this.loading = false
          this.idToUpdate = null
          this.toogleCatModal()
          this.fetchCategories()
        })
      }
    },
    toogleCatModal() {
      this.modal = !this.modal
      this.name = null
      this.newCategorie = true
      this.imgURI = null
      this.period = 'day'
      this.fileImg = null
      this.formData = null
      this.selectedImgName = 'Ninguna seleccionada'
    },
    setToDelete(item) {
      this.modalDelete = !this.modalDelete
      this.itemToDelete = item
    },
    setToUpdate(item) {
      this.newCategorie = false
      this.name = item.name
      this.period = item.period
      this.imgURI = item.photo
      this.idToUpdate = item._id
      this.modal = !this.modal
    },
    removeCategorie(item) {
      // console.log(item)
      this.loading = true
      this.deleteCategorie(item._id).then(() => {
        this.loading = false
        this.itemToDelete = {}
        this.modalDelete = !this.modalDelete
        this.fetchCategories()
      })
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
