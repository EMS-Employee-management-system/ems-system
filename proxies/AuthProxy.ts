import { BaseProxy } from 'vue-api-queries'

export class UserProxy extends BaseProxy {
  constructor(props = {}) {
    super('api/auth/user', props)
  }
}
export default { UserProxy }
