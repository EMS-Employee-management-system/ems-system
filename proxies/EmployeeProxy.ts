import { BaseProxy } from 'vue-api-queries'

export class EmployeeProxy extends BaseProxy {
  constructor(props = {}) {
    super('api/employees', props)
  }
}
export default { EmployeeProxy }
