<template>
  <v-card width="450">
    <v-card-title class="align-center justify-center"> LOGIN </v-card-title>
    <v-divider />
    <v-form ref="loginForm" class="pa-5" @keyup.native.enter="login">
      <v-card-text>
        <v-text-field
          v-model="login.username"
          label="Username"
          :rules="[required('Username')]"
          outlined
          placeholder="Username"
          dense
        ></v-text-field>
        <v-text-field
          v-model="login.password"
          :rules="[required('Password'), minLength('Password')]"
          class="c-form-control"
          outlined
          dense
          label="Passowrd"
          placeholder="Password"
          :type="hidePassword ? 'password' : 'text'"
          :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="hidePassword = !hidePassword"
        ></v-text-field>
        <v-btn
          color="primary"
          large
          block
          class="display-block"
          @click="userLogin"
        >
          LOGIN
        </v-btn>
        <nuxt-link :to="localePath('/register')">
          Don't have an account? Sign Up
        </nuxt-link>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import ValidationMixins from '~/mixins/validations'
export default Vue.extend({
  layout: 'auth',
  name: 'LoginPage',
  mixins: [ValidationMixins],
  data() {
    return {
      login: {
        username: '',
        password: '',
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
    async userLogin(this: any) {
      try {
        if (this.$refs.loginForm.validate()) {
          await this.$auth.loginWith('local', { data: this.login })
        }
      } catch (e) {
        console.info(e)
      }
    },
    register(this: any) {
      const path = this.localePath({
        name: 'register',
      })
      return this.$router.push(path)
    },
  },
})
</script>
