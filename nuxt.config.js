import colors from 'vuetify/es5/util/colors'
import config from './configs'
const { auth, axios } = config

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
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

  // Global CSS (https://go.nuxtjs.dev/config-css)
  // css: ['~/assets/theme.scss'],
  css: ['~/assets/scss/theme.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '~/plugins/axios' }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)

  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', 'nuxt-i18n', 'vue-waiting/nuxt'],
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

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
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

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  auth,
  axios,
  router: {
    middleware: ['auth'],
  },
}
