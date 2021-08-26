<template>
  <div>
<<<<<<< HEAD
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
=======
    <div class="field mb-5">
      <input
        v-model="searchDish"
        class="input"
        type="text"
        placeholder="Buscar plato"
      />
    </div>
    <div class="columns is-multiline">
      <div v-for="item in filterByName" :key="item._id" class="column">
        <div class="panel" :class="isPeriod(item.period)">
          <p class="panel-heading">{{ item.name }}</p>
          <a
            v-for="(dish, index) in item.dishes"
            :key="index"
            class="panel-block"
          >
            <span
              class="column is-8 py-0"
              @click="dishToUpdate(item._id, item.name, dish)"
              >{{ dish.name }}</span
            >
            <span class="column is-3 py-0">{{ dish.price | price }}</span>
            <a class="column delete" @click="dishToDelete(item._id, dish)"></a>
          </a>
          <div class="panel-block">
            <button
              class="button is-link is-outlined is-fullwidth"
              @click="addDish(item._id, item.name)"
            >
              Agregar nuevo plato
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" :class="{ 'is-active': modal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ selectedDish.category }}</p>
          <button
            class="delete"
            aria-label="close"
            @click="closeModal()"
          ></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
              <input
                v-model="selectedDish.name"
                class="input"
                type="text"
                placeholder="Nombre de plato"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Precio</label>
            <div class="control has-icons-left">
              <input
                v-model="selectedDish.price"
                class="input"
                type="text"
                placeholder="Precio del plato"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user">S/ </i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Descripción</label>
            <div class="control">
              <textarea
                v-model="selectedDish.descr"
                class="textarea"
                placeholder="Descripción del plato"
              ></textarea>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-success"
            @click="dispatchDish()"
            :disabled="!(selectedDish.name && selectedDish.price)"
          >
            {{ isNewDish }} plato
          </button>
          <button class="button" @click="closeModal()">Cancelar</button>
        </footer>
      </div>
    </div>

    <div class="modal" :class="{ 'is-active': modalDelete }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="field">
            ¿Eliminar <strong>{{ selectedDish.name }}</strong
            >?
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button
                class="button is-danger"
                :class="{ 'is-loading': loading }"
                @click="removeDish()"
              >
                Eliminar
              </button>
            </div>
            <div class="control">
              <button
                class="button is-link is-light"
                @click="closeModalDelete()"
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
        @click="closeModalDelete()"
      ></button>
    </div>
>>>>>>> development
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
