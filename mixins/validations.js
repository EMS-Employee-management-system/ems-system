import { validateEmail } from '~/lib/helpers'

export default {
  methods: {
    required(property = '') {
      return (v) =>
        ((v || v === 0) && v.toString().length > 0 && !!v.toString().trim()) ||
        `${property}${' is required!'}`
    },
    isEmail(options) {
      return (value) =>
        !value || validateEmail(value, options) || this.$t('Email invalid')
    },
    minLength(field = '', length = 8) {
      const message =
        field && field.trim().length > 0
          ? `Please input ${field} at least ${length} characters`
          : `Please input at least ${length} characters`
      return (value) => !value || value.toString().length >= length || message
    },
  },
}
