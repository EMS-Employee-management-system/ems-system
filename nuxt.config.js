import colors from 'vuetify/es5/util/colors'
import config, { build } from './configs'
const { auth, axios, proxy } = config

export default {
  ssr: false,
  target: 'static',
  server: {
    port: process.env.PORT || 5050,
    host: process.env.HOST || '0.0.0.0',
  },
  head: {
    titleTemplate: '%s - EMS',
    title: 'EMS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['~/assets/scss/theme.scss'],
  plugins: [{ src: '~/plugins/axios' }],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],
  modules: [
    'vue-api-queries/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-i18n',
    'vue-waiting/nuxt',
  ],
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome',
        },
        ja: {
          welcome: 'Bienvenue',
        },
      },
    },
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_URL,
    },
    apiKey: process.env.API_KEY,
  },
  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  build,
  auth,
  axios,
  proxy,
  router: {
    middleware: ['auth'],
  },
}
