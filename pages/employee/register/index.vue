<template>
  <v-sheet>
    <page-employee
      title="Register new customer"
      action-text="submit"
      cancel-text="Cancel"
      @cancel="cancel"
    />
  </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue'
import ValidationMixins from '~/mixins/validations'
export default Vue.extend({
  layout: 'default',
  name: 'Register',
  auth: false,
  mixins: [ValidationMixins],

  methods: {
    cancel(this: any) {
     const path = this.localePath({
        name: 'employee',
      })
      return this.$router.push(path)
    }
  }
})
</script>
