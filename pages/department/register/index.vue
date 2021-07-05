<template>
  <v-sheet>
    <page-department
      v-model="departmentForm"
      title="Register new department"
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
  name: 'Register',
  data() {
    return {
      departmentForm: {},
    }
  },
  computed: {
    loading(this: any) {
      return this.$waiting.is('department:register')
    },
  },
  methods: {
    cancel(this: any) {
      const path = this.localePath({
        name: 'department',
      })
      return this.$router.push(path)
    },
    register(this: any) {
      this.$store.dispatch('department/register', this.departmentForm)
    },
  },
})
</script>
