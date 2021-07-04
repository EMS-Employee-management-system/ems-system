<template>
  <v-sheet>
    <page-department
      v-model="departmentForm"
      title="Update department"
      action-text="update"
      cancel-text="Cancel"
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
      departmentForm: {},
    }
  },
  computed: {
    departmentDetail(this: any) {
      return this.$store.getters['department/detail']
    },
  },
  async mounted(this: any) {
    await this.getDepartmentDetail()
    this.departmentForm = cloneDeep(this.departmentDetail)
  },
  methods: {
    cancel(this: any) {
      const path = this.localePath({
        name: 'department',
      })
      return this.$router.push(path)
    },
    update(this: any) {
      this.$store.dispatch('department/update', this.departmentForm)
    },
    async getDepartmentDetail(this: any) {
      await this.$store.dispatch('department/detail', this.$route.params.id)
    },
  },
})
</script>
