<script setup>
import { computed } from "vue";

const props = defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
});

const percentage = computed(() => {
  const total = props.total;
  if (!Number.isFinite(total) || total <= 0) return 0;
  const raw = (props.current / total) * 100;
  return Math.min(100, Math.max(0, raw));
});
</script>

<template>
  <div
    class="progress-bar"
    role="progressbar"
    :aria-valuenow="Math.round(percentage)"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="Progress"
  >
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
    min-width: 0px;
  }
}
</style>
