<script setup>
defineProps({
  title: { type: String, required: true }, // Titre de l'accordéon
  details: { type: [Array, String], required: true }, // Tableau JSON
  image: { type: String, required: true },
  isOpen: { type: Boolean, default: false }, // Indique si l'accordéon est ouvert
});

const emit = defineEmits(["toggle"]); // Event émis quand on clique sur l'en-tête
</script>

<template>
  <div class="accordion-items" :class="{ 'accordion-items--open': isOpen }">
    <button
      class="accordion-items__header"
      type="button"
      :aria-expanded="isOpen"
      @click="emit('toggle')"
    >
      <h2 class="accordion-items__title">{{ title }}</h2>
      <Icon class="accordion-items__chevron" name="mdi:chevron-down" />
    </button>
    <Transition name="accordion">
      <div v-if="isOpen" class="accordion-items__content">
        <ul v-if="Array.isArray(details)" class="accordion-items__details">
          <li v-for="(detail, index) in details" :key="index">
            <Icon class="accordion-items__icons-list" name="mdi:gear-outline" />
            {{ detail }}
          </li>
        </ul>
        <p v-else class="accordion-items__description">
          {{ details }}
        </p>
        <img :src="image" :alt="title" class="accordion-items__image" />
      </div>
    </Transition>
  </div>
</template>
