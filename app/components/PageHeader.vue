<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
});
</script>

<template>
  <div class="page-header">
    <div class="page-header__cover">
      <img v-if="image" :src="image" alt="" aria-hidden="true" />
    </div>
    <div class="page-header__content">
      <h1 class="page-header__title">{{ title }}</h1>
      <span class="page-header__separator"></span>
      <h2 v-if="subtitle" class="page-header__sub">{{ subtitle }}</h2>
    </div>

    <div class="page-header__actions-container">
      <div v-if="$slots.actions" class="page-header__actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
