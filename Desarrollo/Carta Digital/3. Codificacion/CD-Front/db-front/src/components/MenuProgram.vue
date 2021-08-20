<template>
  <div class="column">
    <div class="panel is-dark">
      <p class="panel-heading">{{ item.name }}</p>

      <p class="panel-tabs">
        <a
          :class="{ 'is-active': currentTab == 'entradas' }"
          @click="setTab('entradas')"
          >Entradas</a
        >
        <a
          :class="{ 'is-active': currentTab == 'fondos' }"
          @click="setTab('fondos')"
          >Fondos</a
        >
      </p>

      <a
        v-for="(e, index) in item.entradas"
        :key="'e' + index"
        class="panel-block"
        v-show="currentTab == 'entradas'"
      >
        <label class="column is-11 py-0" :class="{ over: e.over }">
          <input type="checkbox" v-model="e.over" @change="toUpdate(e)" />
          {{ e.name }}
        </label>
        <a class="column delete is-1" @click="toDelete(e)"></a>
      </a>

      <a
        v-for="(f, index) in item.fondos"
        :key="'f' + index"
        class="panel-block"
        v-show="currentTab == 'fondos'"
      >
        <label class="column is-11 py-0" :class="{ over: f.over }">
          <input type="checkbox" v-model="f.over" @change="toUpdate(f)" />
          {{ f.name }}
        </label>
        <a class="column delete is-1" @click="toDelete(f)"></a>
      </a>

      <div class="field has-addons panel-block">
        <div class="control">
          <input
            v-model="dishToAdd"
            class="input"
            type="text"
            :placeholder="`Agregue plato de ${currentTab.slice(0, -1)}`"
            @keyup.enter="addDish"
          />
        </div>
        <div class="">
          <a
            class="button is-info"
            :class="{ 'is-loading': loading }"
            :disabled="!dishToAdd"
            @click="addDish()"
          >
            Agregar
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['item'],
  data() {
    return {
      currentTab: 'entradas',
      dishToAdd: '',
      loading: false,
    }
  },
  methods: {
    ...mapActions({
      createDish: 'daymenu/createDish',
      deleteDish: 'daymenu/deleteDish',
      updateDish: 'daymenu/updateDish',
    }),
    setTab(value) {
      this.currentTab = value
    },
    addDish() {
      this.loading = true
      this.createDish({
        id: this.item._id,
        dish: this.currentTab,
        data: {
          name: this.dishToAdd,
          over: false,
        },
      }).then(() => {
        this.dishToAdd = ''
        this.loading = false
      })
    },
    toDelete(payload) {
      this.deleteDish({
        id: this.item._id,
        dish: this.currentTab,
        data: payload,
      })
    },
    toUpdate(payload) {
      // console.log(payload)
      this.updateDish({
        id: this.item._id,
        dish: this.currentTab,
        data: {
          newDish: payload,
          oldDish: {
            name: payload.name,
            over: !payload.over,
          },
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.panel {
  width: 475px;
}
label.column {
  cursor: pointer;
}
.over {
  text-decoration: line-through;
}
</style>
