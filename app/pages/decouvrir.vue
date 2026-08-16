<script setup>
import gateCard from "~/data/decouvrir/gate-card.json";
import { computed } from "vue";

const primaryGates = computed(() =>
  gateCard.filter((gate) => gate.size === "large"),
);
const secondaryGates = computed(() =>
  gateCard.filter((gate) => gate.size === "small"),
);
</script>

<template>
  <div>
    <div class="celestial" aria-hidden="true">
      <div class="celestial__ring celestial__ring--solid" />
      <div class="celestial__ring celestial__ring--dashed" />
      <div class="celestial__moon" />
    </div>
    <PageHeader
      title="Découvrir l’univers de l’horlogerie"
      subtitle="Explorez son histoire, testez vos connaissances et plongez dans ses plus grands secrets."
    />
    <div class="discovery-page">
      <section class="discovery-page__primary-gates">
        <DiscoveryGate
          v-for="gate in primaryGates"
          :key="gate.to"
          v-bind="gate"
        />
      </section>

      <section class="discovery-page__secondary-gates">
        <DiscoveryGate
          v-for="gate in secondaryGates"
          :key="gate.to"
          v-bind="gate"
        />
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.discovery-page__primary-gates {
  position: relative;
}
.celestial {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
}

.celestial__ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.celestial__ring--solid {
  width: 110vmin;
  aspect-ratio: 1;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.celestial__ring--dashed {
  width: 90vmin;
  aspect-ratio: 1;
  background: repeating-conic-gradient(
    rgba(255, 255, 255, 0.5) 0deg 0.6deg,
    transparent 0.6deg 3deg
  );
  mask: radial-gradient(
    circle,
    transparent calc(50% - 6px),
    black calc(50% - 5px),
    black 50%,
    transparent calc(50% + 1px)
  );
  -webkit-mask: radial-gradient(
    circle,
    transparent calc(50% - 6px),
    black calc(50% - 5px),
    black 50%,
    transparent calc(50% + 1px)
  );
}

.celestial__moon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  height: 20rem;
  background: url("/images/background/moon.webp") center/contain no-repeat;
  border-radius: 50%;
}
</style>
