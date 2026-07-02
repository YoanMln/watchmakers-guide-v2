<script setup>
import { ref, computed } from "vue";

import aiguillage from "~/data/techniques/aiguillage.json";
import posage from "~/data/techniques/posage.json";
import tolerance from "~/data/techniques/tolerance-controle.json";

const selectedStep = ref("posage");

const techniques = [
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
  return (
    techniques.find((technique) => technique.id === selectedStep.value)?.data ??
    []
  );
});
</script>

<template>
  <article class="techniques-page">
    <div class="title-pages">
      <h1>Techniques d'asssemblage en horlogerie</h1>
    </div>

    <div class="container-select">
      <div class="list-choice">
        <h2>Choix de l'étape d'assemblage sur un mouvement 2824</h2>
        <div class="container-btn-technic">
          <button
            class="btn-filters btn"
            v-for="technique in techniques"
            :key="technique.id"
            type="button"
            :aria-pressed="selectedStep === technique.id"
            @click="selectedStep = technique.id"
            :class="{ active: selectedStep === technique.id }"
          >
            {{ technique.label }}
          </button>
        </div>
      </div>
    </div>

    <section class="container-card">
      <div class="card-grid">
        <article
          v-for="technic in filteredSteps"
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

.btn-filters {
  padding: 1rem 2rem;
  border: 1px solid #ad856f;
  border-radius: 2px;
  display: flex;
}

.container-btn-technic {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
</style>
