export const build = {
  transpile: [
    ' vuetify/lib',
    'vue-api-queries',
    'map-obj',
    'camelcase-keys',
    'camelcase',
    'quick-lru',
    'vue-waiting',
    '@nuxtjs/auth-next',
    'requrl',
    'is-https',
  ],
  babel: {
    babelrc: false,
    presets: [
      [
        '@nuxt/babel-preset-app',
        {
          corejs: { version: 3 },
          targets: { browsers: ['last 1 versions'], ie: 11 },
        },
      ],
    ],
  },
  extend(config, { isDev, isClient }) {
    if (isDev && isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)|(\.svg$)/,
      })
    }
    if (!isDev && isClient) {
      config.module.rules.push({
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
        exclude: /(node_modules)/,
      })
    }
    config.node = {
      fs: 'empty',
    }
  },
  devMiddleware: {
    headers: {
      'Cache-Control': 'no-store',
      Vary: '*',
    },
  },
}
