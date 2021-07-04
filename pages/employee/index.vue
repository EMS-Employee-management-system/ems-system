<template>
  <v-sheet>
    <div class="pa-3 display-1">
      Employee list
      <v-btn class="float-right mr-1" @click="addNewEmployee">add new</v-btn>
    </div>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="employees"
        :server-items-length="pagination.total"
        class="elevation-6 rounded-0"
        :sort-desc="[false, true]"
        height="calc(100vh - 280px)"
        fixed-header
        :footer-props="tableFooter"
        disable-pagination
        :page="page"
        :options.sync="options"
        :items-per-page="limit"
      >
        <template #[`item.action`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon color="red" small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
    <common-dialog
      :dialog.sync="dialog"
      title="Delete employee"
      :dialog-props="{ width: 500 }"
      cancel-text="Cancel"
      action-text="Delete"
      @commit="handleDelete"
    >
      <v-card-text>
        <span>Are you sure want to delete employee?</span>
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
  name: 'EmployeeList',
  mixins: [DataTable],
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: 'First name',
          value: 'firstName',
          sortable: false,
        },
        { text: 'Last name', value: 'lastName', sortable: false },
        { text: 'Position', value: 'position', sortable: false },
        { text: 'Province', value: 'province', sortable: false },
        { text: 'Gender', value: 'gender', sortable: false },
        { text: 'Phone', value: 'phone', sortable: false },
        { text: 'action', value: 'action', sortable: false },
      ],
      limit: 20,
      page: 1,
      options: {
        mustSort: false,
      },
      id: null,
    }
  },
  computed: {
    employees(this: any) {
      return this.$store.getters['employee/all']
    },
    pagination(this: any) {
      return this.$store.getters['employee/pagination']
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
        this.getCustomer()
      },
      deep: true,
    },
  },
  mounted(this: any) {
    this.getCustomer()
  },
  methods: {
    async getCustomer(this: any) {
      await this.$store.dispatch('employee/all', {
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
    addNewEmployee(this: any) {
      const localePath = this.localePath({
        name: 'employee-register',
      })
      return this.$router.push(localePath)
    },
    editItem(data: ObjectType) {
      const { id } = data
      const localePath = this.localePath({
        name: `employee-id`,
        params: { id },
      })
      return this.$router.push(localePath)
    },
    async handleDelete(this: any) {
      await this.$store.dispatch('employee/deleteEmployee', this.id)
      await this.getCustomer()
      this.dialog = false
    },
  },
})
</script>
