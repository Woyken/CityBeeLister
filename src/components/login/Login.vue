<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Login to CityBee</h3>
          <div class="subtitle has-text-red" v-if="errorMessage">{{ errorMessage }}</div>
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
  </section>
</template>

<script lang="ts">
import Login from "./Login";
export default Login;
</script>

