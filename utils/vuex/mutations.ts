import {
  filter,
  has,
  isObject,
  startsWith,
  includes,
  toLower,
  uniqBy,
  some,
  cloneDeep,
  isUndefined,
} from 'lodash'
import { BaseTransformer } from 'vue-api-queries'
import type { BaseProxy } from 'vue-api-queries'

export interface UpdatedPayload {
  id: string | number
}
export interface DestroyedPayload {
  action?: string | number
}
export interface PaginationOptions {
  include?: any[]
  pageCount?: number
  count: number
  pageStop?: number
  total: number
  itemsLength: number
  perPage: number
  itemsPerPage?: number
  pageStart?: number
  totalPages: number
  links?: {}
  page?: number
  currentPage?: number
}
export interface StateOption {
  detail?: any | any[]
  all: Array<any>
  pagination: PaginationOptions
  filters?: Array<any>
}
export interface FilterPayload {
  query: string
  deep: boolean
  isReversed: boolean
  fullTextFilter: boolean
  search: string
  q: string
}
export interface AllPayload {
  items: any | any[]
  pagination: any | any[]
}

// ========== STATE  ========== //
export const pagination: PaginationOptions = {
  perPage: 20,
  totalPages: 0,
  currentPage: 1,
  total: 0,
  links: {},
  count: 0,
  page: 0,
  itemsPerPage: 20,
  pageCount: 0,
  itemsLength: 0,
  pageStart: 0,
  pageStop: 0,
  include: [],
}

// ========== MUTATIONS  ========== //
export const CREATED = (state: StateOption, payload = {}): void => {
  const { total, perPage } = state.pagination
  state.pagination.total += 1
  state.pagination.count += 1
  state.pagination.itemsLength += 1
  if (total % perPage === 0) {
    state.pagination.count = perPage
    state.pagination.totalPages += 1
  }
  if (isUndefined(state.all)) {
    state.all = []
  }
  state.all.push(payload)
  state.filters = state.all
}
export const UPDATED = (state: StateOption, payload: UpdatedPayload): void => {
  const { id } = payload || {}
  state.all = state.all.map((item: any) => {
    if (item.id === id) {
      return { ...item, ...payload }
    }
    return { ...item }
  })
}
export const DETAIL = (state: StateOption, payload = {}) => {
  state.detail = BaseTransformer.fetch(payload)
}
export const LOAD_MORE = (state: StateOption, payload: AllPayload) => {
  const { items, pagination } = payload
  const all = uniqBy([...state.all, ...items], 'id')
  state.all = all
  state.filters = all
  state.pagination = pagination
}
export const ALL = (state: any, { items = [], pagination = {} }) => {
  state.all = items
  state.filters = items
  state.pagination = pagination
}
export const DESTROYED = async (state: any, payload: DestroyedPayload) => {
  const { action = null } = payload
  const { currentPage, count, limit, totalPages } = state.pagination
  let page = currentPage
  if (totalPages === currentPage && currentPage !== 1 && count % limit === 1) {
    page -= 1
  }
  delete payload.action
  const type: string = action ? `${action}/all` : 'all'
  await window.$nuxt.$store.dispatch(type, {
    ...payload,
    fn: (proxy: BaseProxy) => {
      proxy.setParameter('page', page)
    },
  })
}
export const FILTER = (state: StateOption, payload: FilterPayload) => {
  let query = ''
  let isReversed = false
  let fullTextFilter = false
  let filterUser = false
  if (isObject(payload)) {
    const { deep = false } = payload
    isReversed = payload.isReversed
    fullTextFilter = payload.fullTextFilter
    if (has(payload, 'query')) {
      query = payload.query
    } else if (has(payload, 'search')) {
      query = payload.search
    } else {
      query = payload.q || ''
    }
    filterUser = deep
  } else {
    query = payload || ''
  }
  const filters = isReversed ? cloneDeep(state.all) : cloneDeep(state.filters)
  const filterMethod = fullTextFilter ? includes : startsWith
  const results = filter(filters, (item) => {
    const { users = [] } = item
    const wgUsers = cloneDeep(item.users)
    if (filterUser && users.length) {
      const items = filter(wgUsers, (u) => {
        return filterMethod(toLower(u.name), toLower(query))
      })
      Object.assign(item, { users: items })
      return some(item.users, (i) => {
        return filterMethod(toLower(i.name), toLower(query))
      })
    }
    return filterMethod(toLower(item.name), toLower(query))
  })

  if (isReversed) {
    state.filters = results
  } else {
    state.all = results
  }
}
export const RESET = (state: StateOption) => {
  state.all = []
  state.filters = []
  state.pagination = pagination
}

export const DELETE = (state: StateOption, payload: UpdatedPayload): void => {
  const { id } = payload || {}
  state.all = state.all.filter((item) => item.id !== id)
}

export default {
  ALL,
  RESET,
  DETAIL,
  FILTER,
  CREATED,
  UPDATED,
  LOAD_MORE,
  DESTROYED,
  pagination,
  DELETE,
}
