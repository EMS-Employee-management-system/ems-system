import { BaseProxy } from 'vue-api-queries'

export class AuthProxy extends BaseProxy {
  constructor(props = {}) {
    super('api/auth/user', props)
  }
}
export default { AuthProxy }
