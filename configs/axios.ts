export default {
  axios: {
    proxy: process.env.PROXY,
    debug: process.env.NODE_ENV !== 'production',
  },
}
