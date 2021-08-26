<template>
  <div>
     <div class="field">
        <label class="label">Nombre Plato</label>
        <div class="control has-icons-left">
          <input
            v-model.number="plato.nombre"
            class="input"
            type="text"
            placeholder="ej. Lomo Saltado"
          />
          <span class="icon is-small is-left">
            <BaseIcon name="plato" class="svg-inline" />
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Categoria</label>
        <div class="control has-icons-left">
          <input
            v-model.number="plato.categoria"
            class="input"
            type="text"
            placeholder="ej. Plato de fongo"
          />
          <span class="icon is-small is-left">
            <BaseIcon name="plato" class="svg-inline" />
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Precio Plato</label>
        <div class="control has-icons-left">
          <input
            v-model.number="plato.precio"
            class="input"
            type="text"
            placeholder="ej. Lomo Saltado"
          />
          <span class="icon is-small is-left">
            <BaseIcon name="plato" class="svg-inline" />
          </span>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import price from '@/filters/price'

export default {
  created() {
    this.fetchCarte()
  },
  data() {
    return {
      searchDish: '',
      newDish: null,
      loading: false,
      modal: false,
      modalDelete: false,
      selectedDish: {}, //as temporal
    }
  },
  computed: {
    ...mapState({
      carte: (state) => state.carte.carte,
    }),
    isNewDish() {
      return this.newDish ? 'Agregar' : 'Actualizar'
    },
    filterByName() {
      return this.carte.filter(
        (item) =>
          !item.dishes.length ||
          item.dishes.some((o) =>
            o.name.toLowerCase().includes(this.searchDish.toLowerCase())
          )
      )
    },
  },
  methods: {
    ...mapActions({
      fetchCarte: 'carte/fetchCarte',
      createDish: 'carte/createDish',
      updateDish: 'carte/updateDish',
      deleteDish: 'carte/deleteDish',
    }),
    isPeriod(value) {
      if (value == 'day') return 'is-info'
      else if (value == 'night') return 'is-dark'
      else return 'is-primary'
    },
    addDish(id, catName) {
      this.newDish = true
      this.selectedDish.category = catName
      this.selectedDish.catId = id
      this.modal = !this.modal
    },
    dishToUpdate(id, catName, dish) {
      this.newDish = false
      this.selectedDish.category = catName
      this.selectedDish.catId = id
      this.selectedDish.name = dish.name
      this.selectedDish.price = dish.price
      this.selectedDish.descr = dish.description
      this.selectedDish.oldDish = dish
      this.modal = !this.modal
    },
    dishToDelete(catId, dish) {
      // console.log(catId, name)
      this.selectedDish = {
        ...dish,
        category: catId,
      }
      this.modalDelete = !this.modalDelete
    },
    closeModal() {
      this.selectedDish = {}
      this.newDish = null
      this.modal = !this.modal
    },
    closeModalDelete() {
      this.selectedDish = {}
      this.modalDelete = !this.modalDelete
    },
    dispatchDish() {
      if (this.newDish) {
        this.loading = true
        this.createDish({
          id: this.selectedDish.catId,
          data: {
            name: this.selectedDish.name,
            price: this.selectedDish.price,
            description: this.selectedDish.descr,
          },
        })
          .then(() => {
            this.loading = false
            this.closeModal()
          })
          .catch((e) => console.log(e))
      } else {
        this.loading = true
        this.updateDish({
          id: this.selectedDish.catId,
          data: {
            newDish: {
              name: this.selectedDish.name,
              price: this.selectedDish.price,
              description: this.selectedDish.descr,
            },
            oldDish: this.selectedDish.oldDish,
          },
        })
          .then(() => {
            this.loading = false
            this.closeModal()
          })
          .catch((e) => console.log(e))
      }
    },
    removeDish() {
      this.loading = true
      this.deleteDish({
        id: this.selectedDish.category,
        data: {
          name: this.selectedDish.name,
          price: this.selectedDish.price,
          description: this.selectedDish.description,
        },
      })
        .then(() => {
          this.loading = false
          this.closeModalDelete()
        })
        .catch((e) => console.log(e))
    },
  },
  filters: {
    price,
  },
}
</script>

<style lang="scss" scoped>
.panel {
  width: 475px;
}
</style>
