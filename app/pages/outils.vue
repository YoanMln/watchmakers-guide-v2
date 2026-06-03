<script setup>
import { ref, computed } from "vue";

import assemblage from "~/data/assemblage.json";
import maintenance from "~/data/maintenance-entretien.json";
import reglage from "~/data/reglage-controle.json";

const selectedTool = ref("assemblage");

const tools = computed(() => {
  switch (selectedTool.value) {
    case "assemblage":
      return assemblage;

    case "reglage":
      return reglage;

    case "maintenance":
      return maintenance;

    default:
      return assemblage;
  }
});
</script>

<template>
  <div class="tools-page">
    <div class="title-pages">
      <h1>Les différents outils de l'artisan horloger</h1>

      <div class="intro-page">
        <h2>
          Découvrez les instruments essentiels du métier d’horloger, entre
          tradition et précision.
        </h2>
      </div>
    </div>

    <div class="container-select">
      <div class="list-choice">
        <label for="element-choice"> Choix du type d'outils </label>
        <div class="select-wrapper">
          <select id="element-choice" v-model="selectedTool">
            <option value="assemblage">Assemblage</option>
            <option value="reglage">Réglage & Contrôle</option>
            <option value="maintenance">Maintenance & Entretien</option>
          </select>
          <Icon name="mdi:chevron-down" class="select-arrow" />
        </div>
      </div>
    </div>

    <section class="container-card">
      <div class="card-grid">
        <article v-for="tool in tools" :key="tool.outil" class="card">
          <img
            :src="`/images/outils/${tool.image}`"
            :alt="tool.outil"
            class="card-image"
          />

          <h2>
            {{ tool.outil }}
          </h2>

          <p>
            {{ tool.utilisation }}
          </p>
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
</style>
