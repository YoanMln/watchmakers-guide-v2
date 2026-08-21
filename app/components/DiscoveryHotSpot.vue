<script setup>
defineProps({
  cardGate: { type: Array, required: true },
});

const tickCount = 72;

function hotspotStyle(card) {
  return {
    "--hotspot-angle": `${(360 / tickCount) * card.tickIndex}deg`,
  };
}
</script>

<template>
  <div class="discovery-hotspots">
    <button
      v-for="card in cardGate"
      :key="card.to"
      type="button"
      class="discovery-hotspots__point"
      :style="hotspotStyle(card)"
      :aria-label="card.title"
    >
      <NuxtImg :src="card.icon" class="discovery-hotspots__icon" />
    </button>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/scss/abstracts/variables" as *;

.discovery-hotspots {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 3;
  pointer-events: none;
}

.discovery-hotspots__point {
  all: unset;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90px;
  height: 90px;
  margin: -45px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $black-background;
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  pointer-events: auto;
  transform: rotate(var(--hotspot-angle)) translateY(-47vmin);

  &:focus-visible {
    outline: 2px solid $bronze;
    outline-offset: 3px;
  }
}

.discovery-hotspots__icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
  color: $on-media;
  transform: rotate(calc(var(--hotspot-angle) * -1));
}
</style>
