<template>
  <div>
    <div class="title">Login to CityBee</div>
    <p>Your information is not stored anywhere, sent directly to CityBee API.</p>
    <br>
    <p>Username/Email</p>
    <input v-model="username">
    <p>Password</p>
    <input v-model="password" type="password">
    <button v-on:click="login">Login</button>
  </div>
</template>

<script lang="ts">
import Login from "./Login";
export default Login;
</script>

