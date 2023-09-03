<template>
  <HomeComponent></HomeComponent>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeComponent from "./components/HomeComponent.vue";

export default defineComponent({
  name: "App",
  components: { HomeComponent },
  beforeCreate() {
    document.title = "RasBot";
  },
});
</script>

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
