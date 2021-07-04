<template>
  <v-sheet>
    <div class="pa-3 display-1">User list</div>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="users"
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
        <template #[`item.username`]="{ item }">
          <v-chip
            :color="item.username === $auth.user.username ? 'primary' : ''"
          >
            {{ item.username }}
          </v-chip>
        </template>
        <template v-if="isAdmin()" #[`item.action`]="{ item }">
          <v-icon color="red" small @click="deleteItem(item)">
            {{ item.username === $auth.user.username ? '' : 'mdi-delete' }}
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
        <span>Are you sure want to delete user?</span>
      </v-card-text>
    </common-dialog>
  </v-sheet>
</template>
<script lang="ts">
import Vue from 'vue'
import DataTable from '~/mixins/data-table'
import { BaseProxy } from 'vue-api-queries'
import { ObjectType } from '~/utils/objects'
import Permission from '~/mixins/permission'
export default Vue.extend({
  layout: 'default',
  name: 'UserList',
  mixins: [DataTable, Permission],
  data() {
    return {
      dialog: false,
      limit: 20,
      page: 1,
      options: {
        mustSort: false,
      },
      id: null,
    }
  },
  computed: {
    users(this: any) {
      return this.$store.getters['user/all']
    },
    pagination(this: any) {
      return this.$store.getters['user/pagination']
    },
    headers(this: any) {
      return [
        {
          text: 'ID',
          value: 'id',
          sortable: false,
        },
        {
          text: 'Username',
          value: 'username',
          sortable: false,
        },
        { text: 'Employee', value: 'email', sortable: false },
        { text: 'Roles', value: 'roles[0].name', sortable: false },
        { text: this.displayAction(), value: 'action', sortable: false },
      ]
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
        this.getUsers()
      },
      deep: true,
    },
  },
  mounted(this: any) {
    this.getUsers()
  },
  methods: {
    async getUsers(this: any) {
      await this.$store.dispatch('user/all', {
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
    async handleDelete(this: any) {
      await this.$store.dispatch('user/deleteUser', this.id)
      await this.getUsers()
      this.dialog = false
    },
    displayAction(this: any) {
      if (this.isAdmin()) {
        return 'action'
      }
      return ''
    },
  },
})
</script>
