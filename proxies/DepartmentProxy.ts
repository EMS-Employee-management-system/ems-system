import { BaseProxy } from 'vue-api-queries'

export class DepartmentProxy extends BaseProxy {
  constructor(props = {}) {
    super('api/departments', props)
  }
}
export default { DepartmentProxy }
