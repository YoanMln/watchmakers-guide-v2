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
