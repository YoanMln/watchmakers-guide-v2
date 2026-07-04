<script setup>
defineProps({
  title: String,
  subtitle: String,
});
</script>

<template>
  <div class="page-header">
    <div class="page-header__content">
      <h1 class="page-header__title">{{ title }}</h1>
      <h2 v-if="subtitle" class="page-header__sub">{{ subtitle }}</h2>
    </div>
    <div class="page-header__actions">
      <slot name="actions" />
    </div>
  </div>
</template>