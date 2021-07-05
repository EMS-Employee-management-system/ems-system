import { isObject } from 'lodash'
import Vue from 'vue'

export enum NotifyType {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}

export interface NotificationInterface {
  response?: any
  title?: any
  text?: any
}

function notify(data: any): void {
  const { type, title, text } = data

  Vue.notify({
    type,
    title,
    text,
  })
}

export function notifyException(
  error: any | Error,
  fallbackTextLangPath?: string,
): void {
  const { response = null, message } = error || {}
  let text: string | Object

  if (fallbackTextLangPath) {
    text = window.$nuxt.$i18n.t(fallbackTextLangPath)
  } else {
    text = response
      ? response.data
        ? response.data.message
        : message
      : message
    console.info(text)
    if (isObject(text)) {
      text = Object.values(text).pop()
    }
  }

  notify({
    type: NotifyType.ERROR,
    text,
  })
}

export function notifySuccess(data: NotificationInterface): void {
  notify({ ...data, type: NotifyType.SUCCESS })
}

export function notifyError(data: NotificationInterface): void {
  notify({ ...data, type: NotifyType.ERROR })
}

export function notifyWarning(data: NotificationInterface): void {
  notify({ ...data, type: NotifyType.WARNING })
}
