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
import vue from 'vue';
import vueClassComponent from 'vue-class-component';

import { RouteConfig } from 'vue-router';
import router from '../../router';
import { routes } from '../../router/routes';

@vueClassComponent({
    components: {},
    name: 'Header',
    props: {
        propMessage: String,
    },
})
export default class Header extends vue {
    public isActive: boolean = false;
    public routes: RouteConfig[] = [
        { name: 'Cars List', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Reservation', path: '/reservation' },
    ];

    public toggleNav() {
        this.isActive = !this.isActive;
    }
}
</script>
