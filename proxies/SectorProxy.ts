import { BaseProxy } from 'vue-api-queries'

export class SectorProxy extends BaseProxy {
  constructor(props = {}) {
    super('api/sectors', props)
  }
}
export default { SectorProxy }
