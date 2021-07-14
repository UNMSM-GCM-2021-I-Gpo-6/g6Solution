<template>
  <div class="notification" :class="notificationTypeClass">
    <button class="delete" @click="remove(notification)"></button>
    {{ notification.message }}
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    }
  },
  mounted() {
    this.timeout = setTimeout(() => {
      this.remove(this.notification)
    }, 6000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  computed: {
    notificationTypeClass() {
      return `is-${this.notification.type}`
    },
  },
  methods: mapActions('notification', ['remove']),
}
</script>

<style lang="scss" scoped></style>
