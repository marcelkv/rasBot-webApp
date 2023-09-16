<template>
  <div class="homeComponent" v-on:click="onClickHome">
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
        v-on:keyup.enter="onClickConnect"
        v-on:keyup.tab="onTab"
        placeholder="Robot ID"
      />
      <div
        tabindex="0"
        ref="connectButton"
        class="submitButton inputSection"
        v-bind:class="{ canConnect: canConnect }"
        v-on:click="onClickConnect"
        v-on:keyup.enter="onClickConnect"
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
    <div
      v-if="hasError"
      class="errorSection"
      v-bind:class="{
        largeError: !hasInternetConnectionError,
      }"
    >
      <div
        class="errorWrapper"
        v-bind:class="{
          isErrorReady: canRemoveError,
        }"
      >
        <div v-if="hasInternetConnectionError" class="connectionError">
          <div class="errorTitleItem">
            Oops! It seems you're currently offline.
          </div>
          <div class="errorSecondaryItem center">
            Please check your internet connection and try again.
          </div>
        </div>
        <div v-else class="connectionError">
          <div class="errorTitleItem">
            Cannot establish a connection to RasBot.
          </div>
          <div class="errorSecondaryItem">
            Possible reasons for the connection issue:
          </div>
          <div class="errorSecondaryItem">
            1. Please check if the RobotId is correct.
          </div>
          <div class="errorSecondaryItem">
            2. Ensure that RasBot is turned on.
          </div>
          <div class="errorSecondaryItem">
            3. Make sure RasBot is connected to the internet.
          </div>
          <div class="errorSecondaryItem">
            Please verify these steps to resolve the connection problem.
          </div>
        </div>
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
    const hasInternetConnectionError = ref(false);
    const canRemoveError = ref(false);
    const textInput = ref("");
    const isValidating = ref(false);
    const connectButton = ref(null);

    const clientService = inject<IClientService>("clientService");

    const canConnect = computed(() => {
      return textInput.value.length === 4;
    });

    onMounted(() => {
      hasError.value = false;
      canRemoveError.value = false;
      textInput.value = "";
      isValidating.value = false;
    });

    function onTab(event: KeyboardEvent): void {
      if (!canConnect.value || event?.key !== "Tab") {
        return;
      }

      event.preventDefault();
      connectButton.value?.focus();
    }

    async function onClickConnect(): Promise<void> {
      if (!canConnect.value) {
        return;
      }

      const isRobotIdValid = await isRobotIdValidAsync();

      if (!isRobotIdValid) {
        setStateForInvalidRobotId();
        return;
      }
    }

    async function isRobotIdValidAsync(): Promise<boolean> {
      isValidating.value = true;
      hasInternetConnectionError.value = false;
      let isRobotIdValid = false;

      try {
        isRobotIdValid = await clientService?.isRobotIdValidAsync(
          textInput.value
        );
      } catch (e) {
        hasInternetConnectionError.value = true;
      }

      isValidating.value = false;
      return isRobotIdValid;
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
      hasInternetConnectionError,
      canRemoveError,
      textInput,
      canConnect,
      isValidating,
      onTab,
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

    @media screen and (height: 500px) and (orientation: landscape) {
      flex-grow: 1;
      z-index: 0;
    }

    .image {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: cover;
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

    @media screen and (max-height: 500px) and (orientation: landscape) {
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

    input::placeholder {
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

    &.largeError {
      --errorWrapperHeight: 220px;
    }

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

      .connectionError {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: center;

        .errorTitleItem {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 6px;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .errorSecondaryItem {
          margin-top: 8px;
          margin-left: 20px;
          margin-right: 20px;
          font-size: 16px;
          display: flex;

          &.center {
            justify-content: center;
          }
        }
      }
    }
  }
}
</style>
