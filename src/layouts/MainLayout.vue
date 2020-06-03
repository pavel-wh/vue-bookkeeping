<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <Navbar @click="isOpen = !isOpen" />

      <Sidebar v-model="isOpen" :key="locale" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn" :key="locale + '1'">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="{ html: 'CreateNewRecord', position: 'left' }"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import messages from '@/utils/messages'

export default {
  name: 'main-layout',
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
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (!this.$store.getters.info.bill || !this.$store.getters.info.name) {
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  },
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>
