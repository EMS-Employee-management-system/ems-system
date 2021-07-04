export default {
  methods: {
    isAdmin(this: any) {
      if (this.$auth.user.authorities[0].authority === 'ROLE_ADMIN') {
        return true
      }
      return false
    },
  },
}
