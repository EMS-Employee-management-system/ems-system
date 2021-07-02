import { BaseProxy } from 'vue-api-queries'
import { ObjectType } from '~/utils/objects'

export class AuthProxy extends BaseProxy {
  constructor(props = {}) {
    super('api/auth/user', props)
  }

  singup(payload: ObjectType) {
    return this.submit('post', `api/auth/signup`, payload)
  }
}
export default { AuthProxy }
