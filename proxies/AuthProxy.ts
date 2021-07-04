import { BaseProxy } from 'vue-api-queries'
import { ObjectType } from '~/utils/objects'

export class AuthProxy extends BaseProxy {
  constructor(props = {}) {
    super('api/auth/user', props)
  }

  singup(payload: ObjectType) {
    return this.submit('post', `api/auth/signup`, payload)
  }

  getAll() {
    return this.submit('get', `api/auth/users`)
  }

  deleteOne(id: number) {
    return this.submit('delete', `api/auth/users/${id}`)
  }
}
export default { AuthProxy }
