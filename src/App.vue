<template>
  <n-message-provider>
    <div id="app">
      <router-view />
    </div>
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { NMessageProvider } from "naive-ui";

export default defineComponent({
  name: "App",
  components: {
    NMessageProvider,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}
</style>
