import type { Store } from 'vuex'
import { SectorProxy } from '~/proxies/SectorProxy'
import { notifyException } from '~/utils/notify'
import { ObjectType } from '~/utils/objects'
import { ALL, DETAIL } from '~/utils/vuex/mutation-types'
const options = { root: true }
const proxy = new SectorProxy()
const all = async ({ commit, dispatch }: Store<any>, param: any) => {
  const { fn } = param
  if (typeof fn === 'function') {
    fn(proxy)
  }
  await dispatch('waiting/start', 'customer:fetch', options)
  try {
    const { content, number, totalElements, pageCount } = await proxy.all()
    const items = {
      items: content,
      pagination: { page: number + 1, total: totalElements, pageCount },
    }
    commit(ALL, items)
  } catch (e) {
    notifyException(e)
  } finally {
    await dispatch('waiting/end', 'customer:fetch', options)
  }
}

const create = async (
  { dispatch }: Store<any>,
  payload: ObjectType,
): Promise<any> => {
  await dispatch('waiting/start', 'sector:create', options)
  try {
    await proxy.removeParameters().post(payload)
    const path = window.$nuxt.localePath({
      name: 'sector',
    })
    return window.$nuxt.$router.push(path)
  } catch (e) {
    notifyException(e)
  } finally {
    await dispatch('waiting/end', 'sector:create', options)
  }
}

const update = async (
  { dispatch }: Store<any>,
  payload: ObjectType,
): Promise<any> => {
  await dispatch('waiting/start', 'sector:update', options)
  const { id } = payload
  try {
    await proxy.removeParameters().put(id, payload)
    const path = window.$nuxt.localePath({
      name: 'sector',
    })
    return window.$nuxt.$router.push(path)
  } catch (error) {
    notifyException(error)
  } finally {
    await dispatch('waiting/end', 'sector:update', options)
  }
}

const detail = async ({ commit }: Store<any>, id: number) => {
  try {
    const data = await proxy.removeParameters().find(id)
    commit(DETAIL, data)
  } catch (e) {
    notifyException(e)
  }
}

const deleteSector = async ({ dispatch }: Store<any>, id: number) => {
  await dispatch('waiting/start', 'sector:update', options)
  try {
    await proxy.removeParameters().delete(id)
  } catch (e) {
    console.info(e)
  } finally {
    await dispatch('waiting/end', 'sector:update', options)
  }
}
export default { all, deleteSector, update, detail, create }
