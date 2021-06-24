<template>
  <v-sheet>
    <div class="pa-3 display-1">
      Employee list
      <v-btn class="float-right mr-1" @click="addNewEmployee">add new</v-btn>
    </div>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :sort-desc="[false, true]"
        multi-sort
        class="elevation-1"
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
export default Vue.extend({
  layout: 'default',
  name: 'EmployeeList',
  auth: false,
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
      desserts: [
        {
          firstName: 'Virak',
          lastName: 'Ran',
          position: 'Security',
          province: 'Pursat',
          gender: 'Male',
          phone: '099393709',
        },
        {
          firstName: 'Chanlly',
          lastName: 'Touch',
          position: 'Tester',
          province: 'Kompong charm',
          gender: 'Female',
          phone: '09384724',
        },
        {
          firstName: 'Makara',
          lastName: 'Due',
          position: 'Dev',
          province: 'Rathanakiry',
          gender: 'Male',
          phone: '093754833',
        },
      ],
    }
  },
  methods: {
    deleteItem(this: any) {
      this.dialog = true
    },
    addNewEmployee(this: any) {
      const localePath = this.localePath({
        name: 'employee-register',
      })
      return this.$router.push(localePath)
    },
  },
})
</script>
