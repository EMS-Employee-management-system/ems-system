export default {
  proxy: {
    '/api': {
      target: process.env.API_URL,
      pathRewrite: { '^/api': '' },
    },
  },
}
