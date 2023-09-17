<script lang="ts">
import { IClientService } from "@/common/services/IClientService";
import { inject, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const clientService = inject<IClientService>("clientService");
    const router = useRouter();

    onMounted(() => isConnected());

    function isConnected(): void {
      if (!clientService.isConnected) {
        router.push({ name: "Connect" });
      }
    }
    return {};
  },
};
</script>

<template>
  <div class="homeComponent">
    <div>Hi!</div>
  </div>
</template>

<style scoped lang="less">
.homeComponent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
  height: 100%;
}
</style>
