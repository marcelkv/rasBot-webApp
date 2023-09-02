<template>
  <div class="homeComponent">
    <div class="imageSection">
      <img alt="Vue logo" src="./../assets/logo.png" />
    </div>
    <div class="inputBoxSection">
      <label for="robotId"></label>
      <input
        class="inputBox"
        type="text"
        id="robotId"
        v-model="textInput"
        placeholder="Enter Robot ID"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

export default {
  setup() {
    const textInput = ref("");

    onMounted(() => {
      window.addEventListener("orientationchange", onOrientationChanged);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("orientationchange", onOrientationChanged);
    });

    function onOrientationChanged() {
      textInput.value = "";
    }

    return {
      textInput,
    };
  },
};
</script>

<style lang="less" scoped>
.homeComponent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .imageSection {
  }

  .inputBoxSection {
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;

    .inputBox {
      height: 40px;
      font-size: 25px;
      text-align: center;
      width: calc(100% - 40px);
    }
  }
}
</style>
