<script setup>
import complications from "~/data/complications/complications.json";

const categoryIcons = {
  Toutes: "material-symbols-light:grid-view-outline",
  Calendrier: "mdi:calendar-month",
  Astronomique: "mdi:moon-and-stars",
  "Mesure-du-temps": "mdi:timer-outline",
  Sonnerie: "mdi:bell-ring-outline",
  Tourbillon: "material-symbols:orbit-outline-rounded",
};

const selectedCategory = ref("Toutes");

const setCategory = (nameCategory) => {
  selectedCategory.value = nameCategory;
};

const filteredComplications = computed(() => {
  if (selectedCategory.value === "Toutes") {
    return complications;
  }

  return complications.filter(
    (complication) => complication.category === selectedCategory.value,
  );
});
const uniqueCategory = [
  "Toutes",
  ...new Set(complications.map((complication) => complication.category)),
];
</script>

<template>
  <section class="container-complications-page">
    <!--title-container-->
    <div class="container-complications-title">
      <h1>Les complications</h1>
      <h2>
        Une complication désigne toute fonction d'une montre allant au-delà du
        simple affichage des heures et des minutes. Chaque complication
        représente des décennies de savoir-faire horloger.
      </h2>
    </div>
    <!---->

    <div class="container-complications-filters">
      <!--btn-filter-->
      <button
        v-for="nameCategory in uniqueCategory"
        :key="nameCategory"
        class="btn-filters"
        type="button"
        :aria-pressed="selectedCategory === nameCategory"
        @click="setCategory(nameCategory)"
      >
        <Icon :name="categoryIcons[nameCategory]" size="24" />
        {{ nameCategory }}
      </button>
      <!---->
    </div>

    <div>
      <!--article-grid-->
      <div class="container-complications-flex">
        <article
          v-for="complication in filteredComplications"
          :key="complication.id"
        >
          <div class="complications-card">
            <div class="container-desc-articles">
              <h2>{{ complication.name }}</h2>
              <p>{{ complication.shortDescription }}</p>
              <p>{{ complication.description }}</p>
              <ul>
                <li
                  v-for="(step, index) in complication.howItWorks"
                  :key="index"
                >
                  {{ step }}
                </li>
              </ul>
              <div class="complication-category">
                <Icon :name="categoryIcons[complication.category]" />
                <span>{{ complication.category }}</span>
              </div>
            </div>

            <div class="container-complication-img">
              <img
                :src="complication.image"
                :alt="`Illustration de ${complication.name}`"
              >
            </div>
          </div>
        </article>
      </div>
      <!---->
    </div>
  </section>
</template>
