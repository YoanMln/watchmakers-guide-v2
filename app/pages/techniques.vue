<script setup>
import { ref, computed } from "vue";

import aiguillage from "~/data/techniques/aiguillage.json";
import posage from "~/data/techniques/posage.json";
import tolerance from "~/data/techniques/tolerance-controle.json";

const selectedTechnique = ref("posage");

const techniques = computed(() => {
  switch (selectedTechnique.value) {
    case "posage":
      return posage;

    case "aiguillage":
      return aiguillage;

    case "tolerance-controle":
      return tolerance;

    default:
      return posage;
  }
});
</script>

<template>
  <article class="techniques-page">
    <div class="title-page">
      <h1 class="title-pages">Techniques d'assemblage en horlogerie</h1>
    </div>

    <div class="container-select">
      <div class="list-choice">
        <label for="element-choice"
          >Choix de l'étape d'assemblage sur un mouvement 2824
        </label>
        <div class="select-wrapper">
          <select id="element-choice" v-model="selectedTechnique">
            <option value="posage">Posage</option>
            <option value="aiguillage">Aiguillage</option>
            <option value="tolerance-controle">Tolérance et contrôle</option>
          </select>
          <Icon name="mdi:chevron-down" class="select-arrow" />
        </div>
      </div>
    </div>

    <section class="container-card">
      <div class="card-grid">
        <article
          v-for="technic in techniques"
          :key="technic.etape"
          class="card"
        >
          <img
            :src="`/images/techniques/${technic.image}`"
            :alt="technic.etape"
            class="card-image"
          />
          <h2>{{ technic.etape }}</h2>
          <ul>
            <li v-for="(detail, index) in technic.details" :key="index">
              {{ detail }}
            </li>
          </ul>
        </article>
      </div>
    </section>
  </article>
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
ul {
  li {
    margin-bottom: 1em;
    &::marker {
      color: #ad856f;
    }
  }
}
</style>
