module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'info'] }],
    'import/order': 'off',
    'object-shorthand': 'warn',
    'vue/valid-v-on': 'warn',
    'vue/valid-v-slot': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/html-self-closing': 0,
  },
}
