<script lang="ts">
import { computed, inject, onBeforeUnmount, ref } from "vue";
import { JoyStickPositionCalculator } from "@/components/JoyStickPositionCalculator";
import { IClientService } from "@/common/services/IClientService";
import { JoyStickPosition } from "@/components/JoyStickPosition";
import { RasBotSettings } from "@/common/services/RasBotSettings";

export default {
  setup() {
    const ref_joyStickOut = ref(null);
    const ref_joyStickIn = ref(null);
    const isJoyStickActive = ref(false);
    const left = ref(0);
    const top = ref(0);
    let joyStickPosition: JoyStickPositionCalculator = null;
    let lastPosition: JoyStickPosition;
    const clientService = inject<IClientService>("clientService");
    let isTouch = false;
    let touchTimeoutId: number;
    const settings = clientService.settings ?? new RasBotSettings();

    onBeforeUnmount(() => {
      removeEvents();
    });

    const circleOutStyle = computed(() => {
      return {
        "--left": left.value + "px",
        "--top": top.value + "px",
        "--outerWidth": settings.outerDiameter + "px",
        "--innerWidth": settings.innerDiameter + "px",
        "--outerBorderColor": settings.outerBorderColor,
        "--outerColor": settings.outerColor,
        "--innerColor": settings.innerColor,
      };
    });

    function onTouchStart(event: TouchEvent): void {
      setIsTouch();
      onPointerDown(
        event.changedTouches[0].clientX,
        event.changedTouches[0].clientY
      );
    }

    function onMouseDown(event: MouseEvent): void {
      if (isTouch) {
        return;
      }

      onPointerDown(event.clientX, event.clientY);
    }

    function onPointerDown(x: number, y: number): void {
      isJoyStickActive.value = true;
      initJoyStick();
      addEvents();
      setJoyStickPositionThrottled(x, y);
    }

    function onTouchMove(event: TouchEvent): void {
      setIsTouch();
      onPointerMove(
        event.changedTouches[0].clientX,
        event.changedTouches[0].clientY
      );
    }

    function onMouseMove(event: MouseEvent): void {
      if (isTouch) {
        return;
      }

      onPointerMove(event.clientX, event.clientY);
    }

    function onPointerMove(x: number, y: number): void {
      if (!isJoyStickActive.value) {
        return;
      }

      setJoyStickPositionThrottled(x, y);
    }

    async function onPointerUp(): Promise<void> {
      isJoyStickActive.value = false;
      removeEvents();
      left.value = 0;
      top.value = 0;

      if (isSameCoordinatePosition(0, 0)) {
        return;
      }

      lastPosition = new JoyStickPosition();
      await clientService.setPositionAsync(0, 0);
    }

    function initJoyStick(): void {
      const circleOut = ref_joyStickOut.value as Element;
      const circleIn = ref_joyStickIn.value as Element;
      if (!circleOut || !circleIn) {
        return;
      }

      const rectOut = circleOut.getBoundingClientRect();
      const rectIn = circleIn.getBoundingClientRect();
      joyStickPosition = new JoyStickPositionCalculator(
        rectOut.width,
        rectIn.width,
        rectOut.top,
        rectOut.left
      );
    }

    function setIsTouch(): void {
      isTouch = true;
      clearTimeout(touchTimeoutId);
      touchTimeoutId = setTimeout(() => (isTouch = false), 500);
    }

    function addEvents(): void {
      document.addEventListener("resize", () => initJoyStick());
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onPointerUp);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onPointerUp);
    }

    function removeEvents(): void {
      document.removeEventListener("resize", () => initJoyStick());
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onPointerUp);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onPointerUp);
    }

    function setJoyStickPositionThrottled(x: number, y: number): void {
      const position = joyStickPosition.getPosition(x, y);
      left.value = position.left;
      top.value = position.top;

      if (isSameCoordinatePosition(position.xPercent, position.yPercent)) {
        return;
      }

      lastPosition = position;
      clientService.setPositionThrottled(position.xPercent, position.yPercent);
    }

    function isSameCoordinatePosition(x: number, y: number): boolean {
      if (!lastPosition) {
        return false;
      }

      if (x === lastPosition.xPercent && y === lastPosition.yPercent) {
        return true;
      }

      return (
        Math.abs(x - lastPosition.xPercent) < settings.joyStickPercentOffset &&
        Math.abs(y - lastPosition.yPercent) < settings.joyStickPercentOffset
      );
    }

    return {
      ref_joyStickIn,
      ref_joyStickOut,
      circleOutStyle,
      onTouchStart,
      onTouchMove,
      onMouseDown,
      onMouseMove,
      onPointerUp,
    };
  },
};
</script>

<template>
  <div class="joyStick">
    <div
      ref="ref_joyStickOut"
      class="circleOut"
      v-bind:style="circleOutStyle"
      v-on:touchstart="onTouchStart"
      v-on:touchmove="onTouchMove"
      v-on:touchend="onPointerUp"
      v-on:mousedown="onMouseDown"
      v-on:mousemove="onMouseMove"
      v-on:mouseup="onPointerUp"
    >
      <div ref="ref_joyStickIn" class="circleIn"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.joyStick {
  width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 10px;

  .circleOut {
    --outerWidth: 300px;
    --innerWidth: 100px;
    --outerBorderColor: white;
    --outerColor: #242625;
    --innerColor: white;
    --left: 0px;
    --top: 0px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10000px;
    border: 8px solid var(--outerBorderColor);
    background-color: var(--outerColor);
    min-width: var(--outerWidth);
    min-height: var(--outerWidth);
    max-width: var(--outerWidth);
    max-height: var(--outerWidth);

    .circleIn {
      position: absolute;
      background-color: var(--innerColor);
      width: var(--innerWidth);
      height: var(--innerWidth);
      border-radius: 1000px;
      left: calc(50% - var(--innerWidth) / 2 + var(--left));
      top: calc(50% - var(--innerWidth) / 2 - var(--top));
    }
  }
}
</style>
