<template>
  <div>
    <div class="field is-grouped is-grouped-multiline">
      <div v-for="item in promos" :key="item._id" class="control">
        <div class="tags has-addons">
          <a class="tag is-info is-large" @click="setToUpdate(item)">{{
            item.name
          }}</a>
          <a
            @click="setToDelete(item._id, item.name)"
            class="tag is-delete is-large"
          ></a>
        </div>
      </div>
    </div>

    <button class="button is-info is-outlined mt-3" @click="newPromo()">
      Agregar promoción
    </button>
    <!-- :class="{ 'is-active': promoModal }" -->
    <ModalPromo
      v-if="promoModal"
      :item="promoSelected"
      @closeModal="closeModal"
    />
    <DeleteModal
      v-if="modalDelete"
      :item="promoSelected"
      @closeModalDelete="closeModalDelete"
      @removeItem="removeItem"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ModalPromo from '@/components/ModalPromo'
import DeleteModal from '@/components/DeleteModal'

export default {
  components: {
    ModalPromo,
    DeleteModal,
  },
  created() {
    this.fetchPromos()
  },
  data() {
    return {
      promoModal: false,
      modalDelete: false,
      promoSelected: this.resetSelectedPromo(),
    }
  },
  computed: {
    ...mapState({
      promos: (state) => state.promo.promos,
    }),
  },
  methods: {
    ...mapActions({
      fetchPromos: 'promo/fetchPromos',
      deletePromo: 'promo/deletePromo',
    }),
    setToUpdate(item) {
      this.promoSelected = {
        ...item,
        newPromo: false,
      }
      this.promoModal = !this.promoModal
    },
    setToDelete(id, name) {
      this.promoSelected = { id, name }
      this.modalDelete = !this.modalDelete
    },
    newPromo() {
      this.promoModal = !this.promoModal
    },
    closeModal(value) {
      this.promoModal = !this.promoModal
      this.promoSelected = this.resetSelectedPromo()
      if (value == 'update') this.fetchPromos()
    },
    closeModalDelete() {
      this.modalDelete = !this.modalDelete
      this.promoSelected = this.resetSelectedPromo()
    },
    removeItem(id) {
      this.deletePromo(id).then(() => {
        this.closeModalDelete()
        this.fetchPromos()
      })
    },
    resetSelectedPromo() {
      return {
        name: '',
        price: 0,
        newPromo: true,
        description: '',
        fileImg: null,
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
