<script setup>
import { computed } from "vue";

const props = defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
});

const percentage = computed(() => (props.current / props.total) * 100);
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__fill" :style="{ width: `${percentage}%` }"></div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/abstracts/variables" as *;
@use "sass:color";

.progress-bar {
  width: 100%;
  height: 5px;
  background: rgba($bronze, 0.1);
  border-radius: 15px;
  border: 1px solid rgba($bronze, 0.3);
  overflow: hidden;
  margin: 2rem 0;

  &__fill {
    height: 100%;
    background: linear-gradient(
      90deg,
      $bronze 0%,
      color.adjust($bronze, $lightness: 15%) 100%
    );
    border-radius: 15px;
    transition: width 0.4s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
  }
}
</style>
