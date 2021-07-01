export default {
  strategies: {
    local: {
      token: {
        property: 'accessToken',
      },
      user: {
        property: '',
      },
      endpoints: {
        login: { url: '/api/auth/signin', method: 'post' },
        logout: { url: '/auth/logout', method: 'post' },
        user: { url: '/api/auth/user', method: 'get' },
      },
    },
  },
  redirect: {
    login: '/auth/signin',
    logout: '/auth/signin',
    callback: '/auth/signin',
    home: false,
  },
  rewriteRedirects: true,
  // scopeKey: 'role',
  // plugins: [{ src: '~/plugins/axios', ssr: true }],
  // plugins: [
  //   { src: '~/plugins/auth-redirect'},
  // ]
}
