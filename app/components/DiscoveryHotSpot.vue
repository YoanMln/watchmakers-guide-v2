<script setup>
defineProps({
  cardGate: { type: Array, required: true },
});

const tickCount = 60;

function hotspotStyle(card) {
  return {
    "--hotspot-angle": `${(360 / tickCount) * card.tickIndex}deg`,
  };
}

const activeCard = ref(null);

function openCard(card) {
  activeCard.value = activeCard.value === card.to ? null : card.to;
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
      :aria-expanded="activeCard === card.to"
      @click="openCard(card)"
    >
      <NuxtImg :src="card.icon" class="discovery-hotspots__icon" />
      <span class="discovery-hotspots__label-anchor">
        <span class="discovery-hotspots__labels">{{ card.title }}</span>
      </span>
    </button>
  </div>
  <div
    v-show="activeCard"
    class="gate-card-container"
    @click="activeCard = null"
  >
    <div class="gate-card" @click.stop>
      <DiscoveryGate
        v-for="card in cardGate"
        v-show="activeCard === card.to"
        :key="card.to"
        v-bind="card"
        @close="activeCard = null"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/scss/abstracts/variables" as *;
@use "~/assets/scss/abstracts/mixins" as *;

.discovery-hotspots {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 3;
  pointer-events: none;
}

.gate-card-container {
  position: fixed;
  inset: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.gate-card {
  width: 700px;
  max-width: calc(100vw - 2rem);
  pointer-events: auto;
}

.discovery-hotspots__point {
  --hotspot-size: clamp(46px, calc(var(--celestial-size) * 0.115), 55px);

  all: unset;
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--hotspot-size);
  height: var(--hotspot-size);
  margin: calc(var(--hotspot-size) / -2);
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  background: $black-background;
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  pointer-events: auto;
  transform: rotate(var(--hotspot-angle))
    translateY(calc(var(--celestial-size) * -0.44));
  animation: levitate 2.5s ease-in-out infinite;
  &:focus-visible {
    outline: 2px solid $bronze;
    outline-offset: 3px;
  }
  &:hover .discovery-hotspots__labels,
  &:focus-visible .discovery-hotspots__labels {
    opacity: 1;
  }
}
.discovery-hotspots__label-anchor {
  position: absolute;
  inset: 0;
  transform: rotate(calc(var(--hotspot-angle) * -1));
  pointer-events: none;
}

.discovery-hotspots__labels {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translate(-50%, -100%);
  white-space: nowrap;
  color: $on-media;
  font-size: $fs-body;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

@keyframes levitate {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -5px;
  }
}

.discovery-hotspots__icon {
  width: 90%;
  height: 90%;
  object-fit: cover;
  color: $on-media;
  transform: rotate(calc(var(--hotspot-angle) * -1));
}

@include mobile {
  .discovery-hotspots__point {
    --hotspot-size: 45px;
    transform: rotate(var(--hotspot-angle))
      translateY(calc(var(--celestial-size) * -0.42));
  }
}
</style>
