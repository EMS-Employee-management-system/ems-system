<template>
  <v-btn @click="goToEdit">edit department</v-btn>
</template>
<script lang="ts">
export default {
  methods: {
    goToEdit(this: any) {
      const path = this.localePath({
        name: 'department-edit',
      })
      return this.$router.push(path)
    },
  },
}
</script>
