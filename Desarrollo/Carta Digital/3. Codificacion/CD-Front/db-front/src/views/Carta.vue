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
export default {}
</script>

<style>
</style>