<template>
  <div>
    <div class="columns is-multiline">
      <MenuProgram v-for="item in daymenu" :key="item._id" :item="item" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MenuProgram from '@/components/MenuProgram'

export default {
  components: {
    MenuProgram,
  },
  created() {
    this.fetchPrograming()
  },
  computed: {
    ...mapState({
      daymenu: (state) => state.daymenu.daymenu,
    }),
  },
  methods: {
    ...mapActions({
      fetchPrograming: 'daymenu/fetchPrograming',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
