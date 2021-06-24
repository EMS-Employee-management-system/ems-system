import { BaseTransformer } from 'vue-api-queries'

export default class PmsTransformer extends BaseTransformer {
  static fetch(payload: any) {
    return super.fetch(payload, true)
  }

  static fetchCollection(payload: Array<any>) {
    return super.fetchCollection(payload, true)
  }

  static send(payload: any) {
    return super.send(payload, true)
  }

  static sendCollection(payload: Array<any>) {
    return super.sendCollection(payload, true)
  }
}
