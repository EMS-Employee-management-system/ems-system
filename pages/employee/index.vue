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
        class="elevation-6 rounded-0"
        :sort-desc="[false, true]"
        multi-sort
        height="calc(100vh - 280px)"
        fixed-header
        disable-pagination
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
    >
      <v-card-text>
        <v-span>Are you sure want to delete employee?</v-span>
      </v-card-text>
    </common-dialog>
  </v-sheet>
</template>
<script lang="ts">
import Vue from 'vue'
import { BaseProxy } from 'vue-api-queries'
export default Vue.extend({
  layout: 'default',
  name: 'EmployeeList',
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: 'First name',
          value: 'firstName',
        },
        { text: 'Last name', value: 'lastName' },
        { text: 'Position', value: 'position' },
        { text: 'Province', value: 'province' },
        { text: 'Gender', value: 'gender' },
        { text: 'Phone', value: 'phone' },
        { text: 'action', value: 'action' },
      ],
      limit: 20,
      page: 1,
    }
  },
  computed: {
    employees(this: any) {
      return this.$store.getters['employee/all']
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
    deleteItem(this: any) {
      this.dialog = true
    },
    addNewEmployee(this: any) {
      const localePath = this.localePath({
        name: 'employee-register',
      })
      return this.$router.push(localePath)
    },
    editItem() {},
  },
})
</script>
