<template>
  <div>
    <div class="field is-grouped is-grouped-multiline">
      <div v-for="item in menues" :key="item._id" class="control">
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

    <button class="button is-info is-outlined mt-3" @click="newMenu()">
      Agregar menú
    </button>
    <!-- :class="{ 'is-active': menuModal }" -->
    <ModalMenu v-if="menuModal" :item="menuSelected" @closeModal="closeModal" />
    <DeleteModal
      v-if="modalDelete"
      :item="menuSelected"
      @closeModalDelete="closeModalDelete"
      @removeItem="removeItem"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ModalMenu from '@/components/ModalMenu'
import DeleteModal from '@/components/DeleteModal'

export default {
  components: {
    ModalMenu,
    DeleteModal,
  },
  created() {
    this.fetchMenues()
  },
  data() {
    return {
      menuModal: false,
      modalDelete: false,
      menuSelected: this.resetSelectedMenu(),
    }
  },
  computed: {
    ...mapState({
      menues: (state) => state.menu.menues,
    }),
  },
  methods: {
    ...mapActions({
      fetchMenues: 'menu/fetchMenues',
      deleteMenu: 'menu/deleteMenu',
    }),
    setToUpdate(item) {
      this.menuSelected = {
        ...item,
        newMenu: false,
      }
      this.menuModal = !this.menuModal
    },
    setToDelete(id, name) {
      this.menuSelected = { id, name }
      this.modalDelete = !this.modalDelete
    },
    newMenu() {
      this.menuModal = !this.menuModal
    },
    closeModal(value) {
      this.menuModal = !this.menuModal
      this.menuSelected = this.resetSelectedMenu()
      if (value == 'update') this.fetchMenues()
    },
    closeModalDelete() {
      this.modalDelete = !this.modalDelete
      this.menuSelected = this.resetSelectedMenu()
    },
    removeItem(id) {
      this.deleteMenu(id).then(() => {
        this.closeModalDelete()
        this.fetchMenues()
      })
    },
    resetSelectedMenu() {
      return {
        name: '',
        price: '',
        newMenu: true,
        fileImg: null,
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
