import type { Store } from 'vuex'
import { ObjectType } from '~/utils/objects'
import { AuthProxy } from '~/proxies/AuthProxy'
import { ALL } from '~/utils/vuex/mutation-types'
const proxy = new AuthProxy()
const options = { root: true }

const all = async ({ commit, dispatch }: Store<any>, param: any) => {
  const { fn } = param
  if (typeof fn === 'function') {
    fn(proxy)
  }
  await dispatch('waiting/start', 'users:fetch', options)
  try {
    const { content, number, totalElements, pageCount } = await proxy.getAll()
    const items = {
      items: content,
      pagination: { page: number + 1, total: totalElements, pageCount },
    }
    commit(ALL, items)
  } catch (e) {
    console.info(e)
  } finally {
    await dispatch('waiting/end', 'users:fetch', options)
  }
}
const signup = async (
  { dispatch }: Store<any>,
  payload: ObjectType,
): Promise<any> => {
  await dispatch('waiting/start', 'user:signup', options)
  try {
    await proxy.removeParameters().singup(payload)
    const path = window.$nuxt.localePath({
      name: 'auth-signin',
    })
    return window.$nuxt.$router.push(path)
  } catch (e) {
    console.info(e)
  } finally {
    await dispatch('waiting/end', 'user:signup', options)
  }
}
const deleteUser = async ({ dispatch }: Store<any>, id: number) => {
  await dispatch('waiting/start', 'user:delete', options)
  try {
    await proxy.removeParameters().deleteOne(id)
  } catch (e) {
    console.info(e)
  } finally {
    await dispatch('waiting/end', 'user:delete', options)
  }
}
export default { signup, all, deleteUser }
