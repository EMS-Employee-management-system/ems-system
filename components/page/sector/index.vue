<template>
  <v-card class="mx-auto" max-width="600" outlined>
    <v-form ref="baseForm" class="pa-5" @keyup.native.enter="baseForm">
      <v-card-title class="justify-center"
        ><v-icon @click="cancel">mdi-arrow-left</v-icon
        >{{ title }}</v-card-title
      >
      <v-divider />
      <v-card-text>
        <v-text-field
          v-model="baseForm.name"
          label="Sector name"
          outlined
          placeholder="Sector name"
          :rules="[required('Sector name')]"
          dense
          :readonly="disabled"
        />
        <v-select
          v-model="baseForm.department_id"
          :items="department"
          item-value="id"
          item-text="name"
          :rules="[required('Gender')]"
          label="Department"
          outlined
          dense
          :readonly="disabled"
        />
      </v-card-text>
      <v-card-actions v-if="!hiddenFooter">
        <v-row no-gutters>
          <v-col cols="6" class="pr-1">
            <v-btn color="secondary" block class="mb-3" @click="cancel">
              {{ cancelText }}
            </v-btn>
          </v-col>
          <v-col cols="6" class="pl-1">
            <v-btn
              color="primary"
              :loading="loading"
              block
              class="mb-3"
              @click="submit"
            >
              {{ actionText }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, VModel } from 'nuxt-property-decorator'
import ValidationMixins from '~/mixins/validations'
import { BaseProxy } from 'vue-api-queries'
interface ICardProps {
  width?: string | number
  maxWidth?: string | number
}
@Component({
  mixins: [ValidationMixins],
  name: 'employee-info',
})
export default class EmployeeInfo extends Vue {
  @VModel({ type: Object }) baseForm!: {}
  @Prop(String) cancelText!: string
  @Prop(String) title!: string
  @Prop(String) actionText!: string
  @Prop(Boolean) loading!: boolean
  @Prop(Boolean) disabled!: boolean
  @Prop({ type: Boolean, default: false }) hiddenFooter!: boolean
  cardProps!: ICardProps

  get width() {
    return this.cardProps.width
  }

  get maxWidth() {
    return this.cardProps.maxWidth || this.cardProps.width
  }

  submit(this: any) {
    if (this.$refs.baseForm.validate()) {
      const department = this.department.find(
        (item: any) => item.id === this.baseForm.department_id,
      )
      delete this.baseForm.department_id
      this.$emit('submit', { ...this.baseForm, department })
    }
  }

  async mounted() {
    await this.getDepartment()
  }

  get department() {
    return this.$store.getters['department/all']
  }

  async getDepartment(this: any) {
    await this.$store.dispatch('department/all', {
      fn: (proxy: BaseProxy) => {
        proxy.removeParameters().setParameters({
          limit: this.limit,
          page: this.page,
        })
      },
    })
  }

  @Emit()
  cancel() {}
}
</script>
