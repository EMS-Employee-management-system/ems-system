import type { Store } from 'vuex'
import { EmployeeProxy } from '~/proxies/EmployeeProxy'
import { ALL } from '~/utils/vuex/mutation-types'
const options = { root: true }
const proxy = new EmployeeProxy()
const all = async ({ commit, dispatch }: Store<any>, param: any) => {
  const { fn } = param
  if (typeof fn === 'function') {
    fn(proxy)
  }
  await dispatch('waiting/start', 'customer:fetch', options)
  try {
    const { content, count, totalElements, pageCount } = await proxy.all()
    const items = {
      items: content,
      pagination: { count, total: totalElements, pageCount },
    }
    commit(ALL, items)
  } catch (e) {
    console.info(e)
  } finally {
    await dispatch('waiting/end', 'customer:fetch', options)
  }
}
export default { all }
