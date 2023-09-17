<script lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import JoyStickComponent from "@/components/JoyStickComponent.vue";

export default {
  components: { JoyStickComponent, HeaderComponent },
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="home">
    <HeaderComponent></HeaderComponent>
    <JoyStickComponent></JoyStickComponent>
  </div>
</template>

<style scoped lang="less">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>
