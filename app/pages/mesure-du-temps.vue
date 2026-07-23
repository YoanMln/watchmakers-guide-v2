<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

import timeline from "~/data/timeline/timeline.json";

const items = timeline;
const timelineItems = ref([]);

let observer;

onMounted(async () => {
  await nextTick();

  observer = new IntersectionObserver(
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
    },
  );

  timelineItems.value.forEach((el) => {
    observer.observe(el);
  });
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <article class="intro-temps">
    <PageHeader
      title="Histoire de la mesure du temps"
      subtitle="Depuis les premières civilisations, la mesure du temps a permis d’organiser la vie quotidienne. D’abord fondée sur l’observation des astres, elle s’est progressivement perfectionnée grâce à des instruments toujours plus précis."
    />
    <div id="timeline-1" class="timeline-container">
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
            >

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
