<template>
  <v-app>
    <div class="d-flex text-center flex-column flex-md-row flex-grow-1">
      <div
        class="
          pa-2 pa-md-4
          flex-grow-1
          align-center
          justify-center
          d-flex
          flex-column
        "
      >
        <div class="layout-content ma-auto w-full">
          <nuxt />
        </div>
        <div class="caption mt-4">Copyright All Rights Reserved.</div>
      </div>
    </div>
  </v-app>
</template>
<script>
export default {
  auth: false,
}
</script>
