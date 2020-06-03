<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from '@/utils/messages'

export default {
  metaInfo() {
    return {
      title: process.env.VUE_APP_NAME,
      meta: [
        { charset: 'utf-8' },
        { name: 'description', content: process.env.VUE_APP_NAME },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>
