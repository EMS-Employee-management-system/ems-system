import { attempt, isError } from 'lodash'

export interface ObjectType {
  [x: string]: any
}

export function isArray(object: ObjectType) {
  return Object.prototype.toString.call(object) === '[object Array]'
}

export function flatten(obj: ObjectType) {
  const flattened: ObjectType = {}

  function recurse(current: ObjectType, property?: any) {
    if (!property && Object.getOwnPropertyNames(current).length === 0) {
      return
    }
    if (Object(current) !== current || Array.isArray(current)) {
      flattened[property] = current
    } else {
      let isEmpty = true
      for (const p in current) {
        isEmpty = false
        if (!Object.prototype.hasOwnProperty.call(current, p)) {
          continue
        }
        recurse(current[p], property ? property + '.' + p : p)
      }
      if (isEmpty) {
        flattened[property] = {}
      }
    }
  }

  if (obj) {
    recurse(obj)
  }
  return flattened
}

export function parseLodash(str = '') {
  return attempt(JSON.parse.bind(null, str)) || {}
}

export function isValidJson(str = '') {
  return !isError(parseLodash(str))
}
