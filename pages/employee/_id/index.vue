<template>
  <v-sheet>
    <page-employee
      v-model="employeeForm"
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
      employeeForm: {},
    }
  },
  computed: {
    employeeDetail(this: any) {
      return this.$store.getters['employee/detail']
    },
    loading(this: any) {
      return this.$waiting.is('employee:update')
    },
  },
  async mounted(this: any) {
    await this.getEmployeeDetail()
    this.employeeForm = cloneDeep(this.employeeDetail)
  },
  methods: {
    cancel(this: any) {
      const path = this.localePath({
        name: 'employee',
      })
      return this.$router.push(path)
    },
    update(this: any) {
      this.$store.dispatch('employee/update', this.employeeForm)
    },
    async getEmployeeDetail(this: any) {
      await this.$store.dispatch('employee/detail', this.$route.params.id)
    },
  },
})
</script>
