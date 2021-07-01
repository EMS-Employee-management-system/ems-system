<template>
  <v-sheet>
    <page-employee
      v-model="customerForm"
      title="Register new customer"
      action-text="submit"
      cancel-text="Cancel"
      @cancel="cancel"
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
      customerForm: {},
    }
  },
  methods: {
    cancel(this: any) {
      const path = this.localePath({
        name: 'employee',
      })
      return this.$router.push(path)
    },
  },
})
</script>
