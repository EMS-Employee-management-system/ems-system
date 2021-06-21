import { AxiosRequestConfig, AxiosError } from 'axios'
import { isUndefined } from 'lodash'
import { Context } from '@nuxt/types'

export default function (context: Context) {
  const {
    $axios,
    app,
    $config: { apiKey },
    isDev,
  } = context
  $axios.onRequest((config: AxiosRequestConfig) => {
    if (isUndefined(config.headers.common)) {
      Object.assign(config.headers, { common: {} })
    }
    config.headers.common.Accept = 'application/json'
    config.headers.common['Accept-Language'] = app.i18n.locale || 'en'
    config.headers.common['x-api-key'] = apiKey
    if (isDev) {
      console.info('Making request to ' + config.url)
    }
  })

  $axios.onError((error: AxiosError) => {
    const code = error.response && error.response.status
    if (code === 400) {
      // redirect('/400')
    }
  })
}
