import { BaseProxy } from 'vue-api-queries'

export class AuthProxy extends BaseProxy {
  constructor(props = {}) {
    super('api/customers', props)
  }
}
export default { AuthProxy }
