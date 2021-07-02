import type { Store } from 'vuex'
import { ObjectType } from '~/utils/objects'
import { AuthProxy } from '~/proxies/AuthProxy'
const proxy = new AuthProxy()
const options = { root: true }
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
export default { signup }
