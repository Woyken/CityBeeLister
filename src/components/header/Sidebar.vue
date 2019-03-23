<template>
  <div>
    <ul class="menu-list">
      <li class v-for="(route, index) in routes" :key="index">
        <router-link class="button is-link" :to="route.path" exact-active-class="active">
          <icon :icon="route.icon" class="mr-2"/>
          <span>{{ route.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import vue from 'vue';

export default vue.extend({
    data: () => {
        return { msg: 'This is sidebar' };
    },
    name: 'Sidebar',
});
</script>
