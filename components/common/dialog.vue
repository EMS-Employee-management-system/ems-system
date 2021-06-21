<template>
  <v-dialog
    v-model="dialogModel"
    :width="width"
    :min-width="maxWidth"
    :light="light"
    :retain-focus="retainFocus"
    :persistent="persistent"
    :no-click-animation="noClickAnimation"
  >
    <v-card class="pa-2" light>
      <v-card-title class="pa-0 pl-3 d-flex">
        <span>{{ title }}</span>
        <slot name="title-left" />
        <v-spacer />
        <slot name="title-right" />
        <v-btn
          min-width="50px"
          height="50px"
          text
          tile
          depressed
          class="ml-auto pa-0"
          :disabled="loading"
          @click="cancel"
        >
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-0 ma-0">
        <v-sheet :max-height="maxBodyHeight" class="overflow-auto">
          <slot />
        </v-sheet>
      </v-card-text>
      <v-divider />
      <v-card-actions v-if="!hideFooter">
        <slot name="actions">
          <slot name="left-actions" />
          <v-spacer />
          <template v-if="!hideCancel">
            <slot name="cancel">
              <v-btn
                color="grey"
                :dark="!loading"
                depressed
                outlined
                tile
                :disabled="loading"
                @click="cancel"
              >
                {{ cancelText }}
              </v-btn>
            </slot>
          </template>
          <template v-if="!hideSubmit">
            <slot name="submit">
              <v-btn
                color="green"
                tile
                :dark="!(disabled || loading)"
                depressed
                outlined
                :disabled="disabled || loading"
                :loading="loading"
                @click="commit"
              >
                {{ actionText }}
              </v-btn>
            </slot>
          </template>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, PropSync } from 'nuxt-property-decorator'

interface IDialogProps {
  light?: boolean
  width?: string | number
  maxWidth?: string | number
  retainFocus?: boolean
  persistent?: boolean
  noClickAnimation?: boolean
}

@Component({
  name: 'common-pms-dialogModel',
})
export default class CommonPmsDialog extends Vue {
  @Prop({
    type: Object,
    default: () => {
      return {
        width: '400px',
        persistent: true,
        retainFocus: false,
        noClickAnimation: true,
      }
    },
  })
  dialogProps!: IDialogProps

  @PropSync('dialog', { type: Boolean }) dialogModel!: boolean
  @Prop(Boolean) loading!: boolean
  @Prop(Boolean) disabled!: boolean
  @Prop(Boolean) hideFooter!: boolean
  @Prop(Boolean) hideSubmit!: boolean
  @Prop(Boolean) hideCancel!: boolean
  @Prop(String) cancelText!: string
  @Prop(String) title!: string
  @Prop(String) actionText!: string
  @Prop({ type: [String, Number], default: 'calc(100vh - 200px)' })
  maxBodyHeight!: string | number

  get light() {
    return this.dialogProps.light
  }

  get persistent() {
    return this.dialogProps.persistent
  }

  get retainFocus() {
    return this.dialogProps.retainFocus
  }

  get noClickAnimation() {
    return this.dialogProps.noClickAnimation
  }

  get width() {
    return this.dialogProps.width
  }

  get maxWidth() {
    return this.dialogProps.maxWidth || this.dialogProps.width
  }

  @Emit()
  open() {
    this.dialogModel = true
  }

  close() {
    this.dialogModel = false
  }

  @Emit()
  cancel() {
    if (this.loading) return
    this.close()
  }

  @Emit()
  commit() {
    return true
  }
}
</script>
