<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  beforeCreate() {
    document.title = "RasBot";
  },
});
</script>

<template>
  <router-view></router-view>
</template>

<style>
html,
body {
  overscroll-behavior: none;
  margin: 0;
  padding: 0;
  border: 0;
}

#app {
  margin: 0;
  left: 0;
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #242625;
}
</style>
