<script setup>
import { ref, computed } from "vue";

import assemblage from "~/data/outils/assemblage.json";
import maintenance from "~/data/outils/maintenance-entretien.json";
import reglage from "~/data/outils/reglage-controle.json";

const selectedTool = ref("assemblage");

const categories = [
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
          class="btn btn-filters"
          v-for="category in categories"
          :key="category.id"
          type="button"
          :aria-pressed="selectedTool === category.id"
          @click="selectedTool = category.id"
          :class="{ active: selectedTool === category.id }"
        >
          {{ category.label }}
        </button>
      </template>
    </PageHeader>
    <section class="container-card">
      <div class="card-grid">
        <article v-for="tool in filteredTools" :key="tool.outil" class="card">
          <img
            :src="`/images/outils/${tool.image}`"
            :alt="tool.outil"
            class="card-image"
          />
          <h2>{{ tool.outil }}</h2>
          <p>{{ tool.utilisation }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.select-wrapper {
  display: inline-flex;
  align-items: center;

  select {
    appearance: none;
    padding-right: 2rem;
    cursor: pointer;
  }

  .select-arrow {
    margin-left: -1.8rem;
    color: white;
    font-size: 1.6rem;
    pointer-events: none;
    margin-top: 1rem;
  }
}

.btn-filters {
  padding: 1rem 2rem;
  border: 1px solid #ad856f;
  border-radius: 2px;
  display: flex;
}

.container-btn-tools {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
</style>
