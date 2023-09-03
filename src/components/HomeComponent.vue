<template>
  <div class="homeComponent" v-on:click="onClickHome()">
    <div class="imageSection">
      <img class="image" alt="Vue logo" src="./../assets/logo.png" />
    </div>
    <div class="inputBoxSection">
      <label for="robotId"></label>
      <input
        class="inputBox inputSection"
        type="text"
        id="robotId"
        v-model="textInput"
        placeholder="Robot ID"
      />
      <div
        class="submitButton inputSection"
        v-bind:class="{ canConnect: canConnect }"
        v-on:click="onClickConnect()"
      >
        <div v-if="!isValidating" class="connectMsg">Connect</div>
        <SpinnerComponent
          v-else
          class="spinner"
          v-bind:is-loading="isValidating"
          v-bind:spinner-size="'20px'"
        />
      </div>
    </div>
    <div v-if="hasError" class="errorSection">
      <div class="errorWrapper" v-bind:class="{ isErrorReady: canRemoveError }">
        ERROR!
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import SpinnerComponent from "@/common/components/SpinnerComponent.vue";
import { IClientService } from "@/common/services/IClientService";

export default {
  components: {
    SpinnerComponent,
  },
  setup() {
    const hasError = ref(false);
    const canRemoveError = ref(false);
    const textInput = ref("");
    const isValidating = ref(false);

    const clientService = inject<IClientService>("clientService");

    const canConnect = computed(() => {
      return textInput.value.length > 3;
    });

    onMounted(() => {
      hasError.value = false;
      canRemoveError.value = false;
      textInput.value = "";
      isValidating.value = false;
    });

    async function onClickConnect(): Promise<void> {
      if (!canConnect.value) {
        return;
      }

      isValidating.value = true;
      const isRobotIdValid = await clientService?.isRobotIdValidAsync(
        textInput.value
      );
      isValidating.value = false;
      if (!isRobotIdValid) {
        setStateForInvalidRobotId();
        return;
      }
    }

    function setStateForInvalidRobotId(): void {
      hasError.value = true;
      setTimeout(() => (canRemoveError.value = true), 200);
    }

    function onClickHome(): void {
      if (!hasError.value || !canRemoveError.value) {
        return;
      }

      hasError.value = false;
      canRemoveError.value = false;
    }

    return {
      hasError,
      canRemoveError,
      textInput,
      canConnect,
      isValidating,
      onClickConnect,
      onClickHome,
    };
  },
};
</script>

<style lang="less" scoped>
.homeComponent {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  --maxSectionWidth: 500px;

  .imageSection {
    flex-grow: 0.7;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    @media screen and (max-width: 768px) and (orientation: landscape) {
      flex-grow: 1;
      z-index: 0;
    }

    .image {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
    }
  }

  .inputBoxSection {
    flex-grow: 0.3;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    --itemWidth: calc(100% - 40px);

    @media screen and (max-width: 768px) and (orientation: landscape) {
      flex-grow: 1;
      position: absolute;
      height: 100%;
      z-index: 1;
    }

    .inputSection {
      width: var(--itemWidth);
      max-width: var(--maxSectionWidth);
      height: 40px;
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 25px;
      font-family: "Segoe UI Light", serif;
      border-radius: 4px;
      color: white;
    }

    .inputBox {
      text-align: center;
      box-sizing: border-box;
      background-color: darkgray;
    }

    .submitButton {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #4a6b4a;

      &.canConnect {
        background-color: #028700;
        cursor: pointer;
      }
    }
  }

  .errorSection {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: rgba(201, 36, 36, 0.7);
    backdrop-filter: blur(8px);
    --errorWrapperHeight: 140px;

    .errorWrapper {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #c92424;
      color: white;
      width: 100%;
      max-width: var(--maxSectionWidth);
      height: var(--errorWrapperHeight);
      border-radius: 4px;
      top: -100%;

      &.isErrorReady {
        top: calc((100% / 2) - (var(--errorWrapperHeight) / 2));
        transition: top 1s;
      }
    }
  }
}
</style>
