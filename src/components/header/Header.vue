<template>
  <nav class="navbar is-primary">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" style="font-weight:bold;">
          <div class="title">CityBee lister</div>
        </a>
        <span
          class="navbar-burger burger"
          data-target="navMenu"
          v-bind:class="{ 'is-active': isActive }"
          v-on:click="toggleNav"
        >
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navMenu" class="navbar-menu" v-bind:class="{ 'is-active': isActive }">
        <div class="navbar-end">
          <router-link
            class="navbar-item"
            :to="route.path"
            exact-active-class="active"
            v-for="(route, index) in routes"
            :key="index"
          >
            <span>{{ route.name }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import Header from './Header';
export default Header;
</script>
