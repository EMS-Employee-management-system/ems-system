<template>
  <v-sheet>
    <page-employee
      v-model="employeeForm"
      title="Register new employee"
      action-text="submit"
      cancel-text="Cancel"
      @cancel="cancel"
      @submit="register"
    />
  </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'default',
  name: 'Register',
  data() {
    return {
      employeeForm: {},
    }
  },
  methods: {
    cancel(this: any) {
      const path = this.localePath({
        name: 'employee',
      })
      return this.$router.push(path)
    },
    register(this: any) {
      this.$store.dispatch('employee/register', this.employeeForm)
    },
  },
})
</script>
