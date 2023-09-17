<script lang="ts">
import LogOutIconComponent from "@/common/components/LogOutIconComponent.vue";
import { computed, inject, onMounted, ref } from "vue";
import { IClientService } from "@/common/services/IClientService";
import { useRouter } from "vue-router";

export default {
  components: { LogOutIconComponent },
  setup() {
    let isHovered = ref(false);
    const clientService = inject<IClientService>("clientService");
    const router = useRouter();

    const color = computed(() => {
      return isHovered.value ? "red" : "white";
    });

    onMounted(() => isConnected());

    function isConnected(): void {
      if (!clientService.isLoggedIn) {
        router.push({ name: "Connect" });
      }
    }

    function onLogOutClick(): void {
      clientService.logOut();
      isConnected();
    }

    return {
      color,
      isHovered,
      onLogOutClick,
    };
  },
};
</script>

<template>
  <div class="header">
    <div
      class="logOutButton"
      title="Log Out"
      v-on:mouseenter="isHovered = true"
      v-on:mouseleave="isHovered = false"
      v-on:click="onLogOutClick"
    >
      <LogOutIconComponent v-bind:size="'40px'" v-bind:color="color" />
    </div>
  </div>
</template>

<style scoped lang="less">
.header {
  --headerHeight: 70px;
  height: var(--headerHeight);
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  .logOutButton {
    width: var(--headerHeight);
    height: var(--headerHeight);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
