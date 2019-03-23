
<template>
  <div>
    <header-vue/>
    <div class="columns">
      <div class="column"></div>
    </div>
    <div class="columns">
      <div class="column messages hero is-fullheight">
        <div class="container">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import App from './App';
export default App;
</script>

