<template>
  <v-card class="mx-auto" max-width="600" outlined>
    <v-form ref="baseForm" class="pa-5" @keyup.native.enter="baseForm">
      <v-card-title class="justify-center">{{ title }}</v-card-title>
      <v-divider />
      <v-card-text>
        <v-text-field
          v-model="baseForm.name"
          label="Name"
          outlined
          placeholder="Name"
          :rules="[required('Name')]"
          dense
        />
        <v-text-field
          v-model="baseForm.location"
          label="Location"
          outlined
          placeholder="Location"
          :rules="[required('Location')]"
          dense
        />
        <v-text-field
          v-model="baseForm.description"
          label="Description"
          :rules="[required('Description')]"
          outlined
          placeholder="Description"
          dense
        />
      </v-card-text>
      <v-card-actions>
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
interface ICardProps {
  width?: string | number
  maxWidth?: string | number
}
@Component({
  mixins: [ValidationMixins],
  name: 'department-info',
})
export default class DepartmentInfo extends Vue {
  @VModel({ type: Object }) baseForm!: {}
  @Prop(String) cancelText!: string
  @Prop(String) title!: string
  @Prop(String) actionText!: string
  @Prop(Boolean) loading!: boolean
  @Prop(Boolean) disabled!: boolean
  cardProps!: ICardProps

  get width() {
    return this.cardProps.width
  }

  get maxWidth() {
    return this.cardProps.maxWidth || this.cardProps.width
  }

  submit(this: any) {
    if (this.$refs.baseForm.validate()) {
      this.$emit('submit', this.baseForm)
    }
  }

  @Emit()
  cancel() {}
}
</script>
