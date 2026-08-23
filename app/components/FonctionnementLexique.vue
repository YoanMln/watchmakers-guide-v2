<script setup>
defineProps({
  termes: { type: Array, required: true },
});
</script>

<template>
  <dl class="lexique">
    <div
      v-for="(terme, index) in termes"
      :key="index.term"
      class="lexique__entry"
    >
      <dt class="lexique__term">{{ terme.term }}</dt>
      <dd class="lexique__definition">{{ terme.definition }}</dd>
    </div>
  </dl>
</template>

<style scoped lang="scss">
@use "~/assets/scss/abstracts/variables" as *;
@use "~/assets/scss/abstracts/mixins" as *;
.lexique {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 2rem;
  margin: 0;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  &__entry {
    margin: 0;
  }

  &__term {
    font-family: $font-display;
    font-style: italic;
    color: var(--color-accent-text);
    font-size: $fs-h2;
  }

  &__definition {
    margin: 0.8rem 0 0;
    font-size: $fs-body-lg;
    color: var(--color-text-muted);
    line-height: 1.4;
  }
}
</style>
