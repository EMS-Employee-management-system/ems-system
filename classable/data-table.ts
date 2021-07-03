import { Component } from 'nuxt-property-decorator'
import type { TranslateResult } from 'vue-i18n'
import Vue from 'vue'

export interface TableFooterType {
  showFirstLastPage?: boolean
  itemsPerPageOptions?: Array<number>
  itemsPerPageText?: string | undefined | TranslateResult
  disablePagination?: boolean
  disableItemsPerPage?: boolean
}

@Component
export default class DataTable extends Vue {
  get tableFooter(): TableFooterType {
    return {
      showFirstLastPage: true,
      itemsPerPageOptions: [5, 10, 20, 40, 50, 100, -1],
      itemsPerPageText: this.$t('common.itemsPerPage'),
      disablePagination: this.$errors.processing,
      disableItemsPerPage: this.$errors.processing,
    }
  }
}
