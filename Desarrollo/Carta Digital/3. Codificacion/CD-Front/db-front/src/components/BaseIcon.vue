<template>
  <svg class="svg-icon" :height="height" :width="width">
    <use v-bind="{ 'xlink:href': '/ico-library.svg#' + name }" />
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 24
    },
    height: {
      type: Number,
      default: 24
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  // height: 0.5em;
  max-height: 100%;
  max-width: 100%;
  fill: currentColor;
}
</style>
