<template>
  <div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Login to CityBee</h3>
          <div class="subtitle has-text-danger" v-if="errorMessage">{{ errorMessage }}</div>
          <div class="box">
            <div class="field">
              <div class="control">
                <input
                  class="input is-large"
                  type="email"
                  v-model="username"
                  placeholder="Your Email"
                  autofocus
                >
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input
                  class="input is-large"
                  type="password"
                  v-model="password"
                  placeholder="Your Password"
                >
              </div>
            </div>
            <button class="button is-block is-info is-large is-fullwidth" v-on:click="login">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import vue from 'vue';
import vueClassComponent from 'vue-class-component';
import authorizationHelper from '../../authorizationHelper';
import router from '../../router';

@vueClassComponent({
    name: 'Login',
})

export default class LoginComponent extends vue {
    public username: string = '';
    public password: string = '';
    public errorMessage: string | null = null;

    public async login() {
        let success = false;
        try {
            success = await authorizationHelper.getNewAuthorizationTokenByUsername(
                this.username, this.password);
        } catch (error) {
            this.errorMessage = error;
            return;
        }

        if (!success) {
            this.errorMessage = 'Login has failed!';
            return;
        }
        this.errorMessage = '';
        router.back();
    }
}
</script>

