<template>
  <v-sheet>
    <page-sector
      v-model="sector"
      title="Register new sector"
      action-text="submit"
      cancel-text="Cancel"
      :loading="loading"
      @cancel="cancel"
      @submit="register"
    />
  </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'default',
  name: 'Create',
  data() {
    return {
      sector: {},
    }
  },
  computed: {
    loading(this: any) {
      return this.$waiting.is('sector:create')
    },
  },
  methods: {
    cancel(this: any) {
      const path = this.localePath({
        name: 'sector',
      })
      return this.$router.push(path)
    },
    register(this: any, data: any) {
      this.$store.dispatch('sector/create', data)
    },
  },
})
</script>
