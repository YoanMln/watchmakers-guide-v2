<script setup>
import { ref, computed } from "vue";

import assemblage from "~/data/outils/assemblage.json";
import maintenance from "~/data/outils/maintenance-entretien.json";
import reglage from "~/data/outils/reglage-controle.json";

const openTool = ref(null);

const selectedTool = ref("all");

const categories = [
  {
    id: "all",
    label: "Tous les outils",
  },
  {
    id: "assemblage",
    label: "Assemblage",
    data: assemblage,
  },
  {
    id: "reglage",
    label: "Réglage",
    data: reglage,
  },
  {
    id: "maintenance",
    label: "Maintenance",
    data: maintenance,
  },
];

const filteredTools = computed(() => {
  if (selectedTool.value === "all") {
    return categories
      .filter((category) => category.data)
      .flatMap((category) => category.data);
  }
  return (
    categories.find((category) => category.id === selectedTool.value)?.data ??
    categories[0]?.data ??
    []
  );
});
</script>

<template>
  <div class="tools-page">
    <PageHeader
      title="Les différents outils de l'artisan horloger"
      subtitle="Découvrez les instruments essentiels du métier d'horloger, entre tradition et précision."
    >
      <template #actions>
        <button
          v-for="category in categories"
          :key="category.id"
          class="btn-filters"
          type="button"
          :aria-pressed="selectedTool === category.id"
          :class="{ active: selectedTool === category.id }"
          @click="selectedTool = category.id"
        >
          {{ category.label }}
        </button>
      </template>
    </PageHeader>
    <section class="tools-items">
      <div class="tools-items__card-grid">
        <article
          v-for="tool in filteredTools"
          :key="tool.outil"
          class="tools-items__card"
        >
          <h2 class="tools-items__name">{{ tool.outil }}</h2>
          <img
            :src="`/images/outils/${tool.image}`"
            :alt="tool.outil"
            class="tools-items__card-image"
          >
          <button
            v-if="openTool !== tool.outil"
            type="button"
            class="tools-items__icon-action"
            aria-label="Afficher la description"
            @click="openTool = tool.outil"
          >
            <Icon name="mdi-light:plus-circle" />
          </button>

          <Transition name="overlay">
            <div
              v-if="openTool === tool.outil"
              class="tools-items__card-overlay"
            >
              <p class="tools-items__description">
                {{ tool.utilisation }}
              </p>

              <button
                type="button"
                class="tools-items__icon-action-close"
                aria-label="Fermer la description"
                @click="openTool = null"
              >
                <Icon name="material-symbols-light:close" />
              </button>
            </div>
          </Transition>
        </article>
      </div>
    </section>
  </div>
</template>
