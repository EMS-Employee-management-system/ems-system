import { TableFooterType } from '~/classable/data-table'

export default {
  computed: {
    tableFooter(this: any): TableFooterType {
      return {
        showFirstLastPage: true,
        itemsPerPageOptions: [5, 10, 20, 40, 50, 100, -1],
        disablePagination: this.$errors.processing,
        disableItemsPerPage: this.$errors.processing,
      }
    },
  },
}
