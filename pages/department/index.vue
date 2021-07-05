<template>
  <v-sheet class="elevation-2">
    <div class="pa-3 display-1">
      Department list
      <v-btn class="float-right mr-1" color="primary" @click="addNewDepartment">
        <v-icon left> mdi-plus </v-icon>add new
      </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="department"
      :server-items-length="pagination.total"
      class="elevation-6 rounded-0"
      :sort-desc="[false, true]"
      multi-sort
      height="calc(100vh - 250px)"
      fixed-header
      :footer-props="tableFooter"
      disable-pagination
      :page="page"
      :options.sync="options"
      :items-per-page="limit"
    >
      <template #[`item.action`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon color="red" small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <common-dialog
      :dialog.sync="dialog"
      title="Delete department"
      :dialog-props="{ width: 500 }"
      cancel-text="Cancel"
      action-text="Delete"
      @commit="handleDelete"
    >
      <v-card-text>
        <span>Are you sure want to delete department?</span>
      </v-card-text>
    </common-dialog>
  </v-sheet>
</template>
<script lang="ts">
import Vue from 'vue'
import DataTable from '~/mixins/data-table'
import { BaseProxy } from 'vue-api-queries'
import { ObjectType } from '~/utils/objects'
export default Vue.extend({
  layout: 'default',
  name: 'DepartmentList',
  mixins: [DataTable],
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: 'Department name',
          value: 'name',
          sortable: false,
        },
        { text: 'Location', value: 'location', sortable: false },
        { text: 'Description', value: 'description', sortable: false },
        { text: 'action', value: 'action', sortable: false },
      ],
      limit: 20,
      page: 1,
      options: {
        mustSort: true,
      },
      id: null,
    }
  },
  computed: {
    department(this: any) {
      return this.$store.getters['department/all']
    },
    pagination(this: any) {
      return this.$store.getters['department/pagination']
    },
  },
  watch: {
    options: {
      handler(this: any, options) {
        const { page, itemsPerPage, sortBy = [] } = options
        if (this.limit === itemsPerPage && page === this.page && !sortBy[0])
          return
        this.limit = itemsPerPage
        this.page = page
        this.getDepartment()
      },
      deep: true,
    },
  },
  mounted(this: any) {
    this.getDepartment()
  },
  methods: {
    async getDepartment(this: any) {
      await this.$store.dispatch('department/all', {
        fn: (proxy: BaseProxy) => {
          proxy.removeParameters().setParameters({
            limit: this.limit,
            page: this.page,
          })
        },
      })
    },
    deleteItem(this: any, { id }: ObjectType) {
      this.id = id
      this.dialog = true
    },
    addNewDepartment(this: any) {
      const localePath = this.localePath({
        name: 'department-register',
      })
      return this.$router.push(localePath)
    },
    editItem(data: ObjectType) {
      const { id } = data
      const localePath = this.localePath({
        name: `department-id`,
        params: { id },
      })
      return this.$router.push(localePath)
    },
    async handleDelete(this: any) {
      await this.$store.dispatch('department/deleteDepartment', this.id)
      await this.getDepartment()
      this.dialog = false
    },
  },
})
</script>
