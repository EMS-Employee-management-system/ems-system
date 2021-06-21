<template>
  <v-card width="450">
    <v-card-title class="align-center justify-center"> REGISTER </v-card-title>
    <v-divider />
    <v-form ref="loginForm" class="pa-5" @keyup.native.enter="login">
      <v-card-text>
        <v-text-field
          v-model="register.first_name"
          label="First name"
          placeholder="First name"
          dense
          outlined
          :rules="[required('First name')]"
        />
        <v-text-field
          v-model="register.last_name"
          label="Last name"
          placeholder="Last name"
          dense
          outlined
          :rules="[required('Last name')]"
        />
        <v-text-field
          v-model="register.email"
          label="Email"
          :rules="[required('Email'), isEmail('Email')]"
          outlined
          placeholder="Email"
          dense
        />
        <v-text-field
          v-model="register.password"
          :rules="[required('Password'), minLength('Password')]"
          class="c-form-control"
          outlined
          dense
          label="Passowrd"
          placeholder="Password"
          :type="hidePassword ? 'password' : 'text'"
          :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="hidePassword = !hidePassword"
        />
        <v-btn
          color="primary"
          large
          block
          class="display-block"
          @click="submit"
        >
          REGISTER
        </v-btn>
        <nuxt-link :to="localePath('login')"> Back to login? Login </nuxt-link>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import ValidationMixins from '~/mixins/validations'
export default Vue.extend({
  layout: 'auth',
  name: 'Register',
  auth: false,
  mixins: [ValidationMixins],
  data() {
    return {
      register: {
        username: '',
        password: '',
        first_name: '',
        last_name: '',
      },
      hidePassword: true,
      dialog: true,
      rules: {
        email: [
          (v: any) => !!v || 'Email is required!',
          (v: string) => /.+@.+\..+/.test(v) || 'Invalid email',
        ],
      },
    }
  },
  methods: {
    submit(this: any) {
      if (this.$refs.loginForm.validate()) {
      }
    },
  },
})
</script>
