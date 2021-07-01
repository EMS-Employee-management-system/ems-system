import { BaseProxy } from 'vue-api-queries'

export class UserProxy extends BaseProxy {
  constructor(props = {}) {
    super('user', props)
  }

  register(payload: {}) {
    return this.submit('post', `${this.endpoint}/register`, payload)
  }

  selectPlan(payload: {}) {
    return this.submit('post', `${this.endpoint}/select-plan`, payload)
  }
}
