<script setup>
import { ref, computed, watch } from "vue";

import aiguillage from "~/data/techniques/aiguillage.json";
import posage from "~/data/techniques/posage.json";
import tolerance from "~/data/techniques/tolerance-controle.json";

const activeIndex = ref(null);
const selectedStep = ref("all");
const techniques = [
  {
    id: "all",
    label: "Toutes les étapes",
    data: [],
  },
  {
    id: "posage",
    label: "Posage",
    data: posage,
  },
  {
    id: "aiguillage",
    label: "Aiguillage",
    data: aiguillage,
  },
  {
    id: "tolerance",
    label: "Tolérance & contrôle",
    data: tolerance,
  },
];

const filteredSteps = computed(() => {
  if (selectedStep.value === "all") {
    return techniques.flatMap((techniques) => techniques.data);
  }
  return (
    techniques.find((technique) => technique.id === selectedStep.value)?.data ??
    []
  );
});

watch(
  filteredSteps,
  (steps) => {
    if (steps.length > 0) {
      activeIndex.value = steps[0].etape;
    } else {
      activeIndex.value = null;
    }
  },
  { immediate: true },
);
</script>

<template>
  <article class="techniques-page">
    <PageHeader
      title="Techniques d'assemblage en horlogerie"
      subtitle="Choix de l'étape d'assemblage sur un mouvement 2824"
    >
      <template #actions>
        <button
          class="btn-filters"
          v-for="technique in techniques"
          :key="technique.id"
          type="button"
          :aria-pressed="selectedStep === technique.id"
          @click="selectedStep = technique.id"
          :class="{ active: selectedStep === technique.id }"
        >
          {{ technique.label }}
        </button>
      </template>
    </PageHeader>
    <section class="accordion">
      <div class="accordion-list">
        <AccordionItems
          v-for="technic in filteredSteps"
          :key="technic.etape"
          :title="technic.etape"
          :details="technic.details"
          :image="`/images/techniques/${technic.image}`"
          :is-open="activeIndex === technic.etape"
          @toggle="
            activeIndex = activeIndex === technic.etape ? null : technic.etape
          "
        />
      </div>

      <div class="accordion-image">
        <Transition name="fade" mode="out-in">
          <img
            v-if="activeIndex"
            :key="activeIndex"
            :src="`/images/techniques/${
              filteredSteps.find((item) => item.etape === activeIndex)?.image
            }`"
            :alt="activeIndex"
          />
        </Transition>
      </div>
    </section>
  </article>
</template>
