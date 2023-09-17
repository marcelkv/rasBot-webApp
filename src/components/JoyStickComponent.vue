<script lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { JoyStickPositionCalculator } from "@/components/JoyStickPositionCalculator";

export default {
  setup() {
    const ref_joyStickOut = ref(null);
    const ref_joyStickIn = ref(null);
    const isJoyStickActive = ref(false);
    const left = ref(0);
    const top = ref(0);
    let joyStickPosition: JoyStickPositionCalculator = null;

    onBeforeUnmount(() => {
      removeEvents();
    });

    const circleOutStyle = computed(() => {
      return {
        "--left": left.value + "px",
        "--top": top.value + "px",
      };
    });

    function onTouchStart(event: TouchEvent): void {
      onPointerDown(
        event.changedTouches[0].clientX,
        event.changedTouches[0].clientY
      );
    }

    function onMouseDown(event: MouseEvent): void {
      onPointerDown(event.clientX, event.clientY);
    }

    function onPointerDown(x: number, y: number): void {
      isJoyStickActive.value = true;
      initJoyStick();
      addEvents();
      setJoyStickPosition(x, y);
    }

    function onTouchMove(event: TouchEvent): void {
      onPointerMove(
        event.changedTouches[0].clientX,
        event.changedTouches[0].clientY
      );
    }

    function onMouseMove(event: MouseEvent): void {
      onPointerMove(event.clientX, event.clientY);
    }

    function onPointerMove(x: number, y: number): void {
      if (!isJoyStickActive.value) {
        return;
      }

      setJoyStickPosition(x, y);
    }

    function onPointerUp(): void {
      isJoyStickActive.value = false;
      left.value = 0;
      top.value = 0;
      removeEvents();
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
        rectOut.left,
        rectOut.width
      );
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
    function setJoyStickPosition(x: number, y: number): void {
      const position = joyStickPosition.getPosition(x, y);
      left.value = position.left;
      top.value = position.top;
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
    --left: 0px;
    --top: 0px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10000px;
    border: 8px solid white;
    min-width: var(--outerWidth);
    min-height: var(--outerWidth);
    max-width: var(--outerWidth);
    max-height: var(--outerWidth);

    .circleIn {
      position: absolute;
      background-color: white;
      width: var(--innerWidth);
      height: var(--innerWidth);
      border-radius: 1000px;
      left: calc(50% - var(--innerWidth) / 2 + var(--left));
      top: calc(50% - var(--innerWidth) / 2 + var(--top));
    }
  }
}
</style>
