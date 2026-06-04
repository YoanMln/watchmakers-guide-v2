<script setup>
import { ref, onMounted, nextTick } from "vue";

import timeline from "~/data/timeline/timeline.json";

const items = timeline;

const timelineItems = ref([]);

onMounted(async () => {
  await nextTick();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("timeline-item--active");

          observer.unobserve(entry.target);
        }
      });
    },

    {
      threshold: 0.15,
    }
  );

  timelineItems.value.forEach((el) => {
    observer.observe(el);
  });
});
</script>

<template>
  <article class="intro-temps">
    <div id="timeline-1" class="timeline-container">
      <div class="timeline-header">
        <h1 class="timeline-header__title">Histoire de la mesure du temps</h1>

        <h2 class="timeline-header__subtitle">
          Des premières civilisations au monde moderne, la mesure du temps a été
          essentielle pour organiser la vie sociale, religieuse et économique.
          <br />
          D'abord basée sur l'observation des astres, elle s'est peu à peu
          perfectionnée grâce à l'invention de moyens toujours plus précis pour
          se repérer dans le temps.
        </h2>
      </div>

      <div class="timeline">
        <div
          v-for="(item, index) in items"
          :key="index"
          ref="timelineItems"
          class="timeline-item"
        >
          <div class="timeline__content">
            <img
              class="timeline__img"
              :src="`/images/mesure-du-temps/${item.img}`"
              :alt="item.alt"
            />

            <h2 class="timeline__content-title">
              {{ item.title }}
            </h2>

            <h3 v-if="item.date" class="timeline__content-date">
              {{ item.date }}
            </h3>

            <p class="timeline__content-desc">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
