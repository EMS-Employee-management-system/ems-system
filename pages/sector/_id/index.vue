<template>
  <v-sheet>
    <page-sector
      v-model="sector"
      title="Update employee"
      action-text="update"
      cancel-text="Cancel"
      :loading="loading"
      @cancel="cancel"
      @submit="update"
    />
  </v-sheet>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash'
import Vue from 'vue'
export default Vue.extend({
  layout: 'default',
  name: 'Register',
  data() {
    return {
      sector: {},
    }
  },
  computed: {
    sectorDetail(this: any) {
      return this.$store.getters['sector/detail']
    },
    loading(this: any) {
      return this.$waiting.is('sector:update')
    },
  },
  async mounted(this: any) {
    await this.getSectorDetail()
    this.sector = cloneDeep({
      ...this.sectorDetail,
      department_id: this.sectorDetail.department.id,
    })
  },
  methods: {
    cancel(this: any) {
      const path = this.localePath({
        name: 'sector',
      })
      return this.$router.push(path)
    },
    update(this: any, data: any) {
      this.$store.dispatch('sector/update', data)
    },
    async getSectorDetail(this: any) {
      await this.$store.dispatch('sector/detail', this.$route.params.id)
    },
  },
})
</script>
