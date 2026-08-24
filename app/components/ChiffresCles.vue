<script setup>
defineProps({
  chiffres: { type: Array, required: true },
});
</script>

<template>
  <div class="chiffres-cles">
    <div
      v-for="chiffre in chiffres"
      :key="chiffre.label"
      class="chiffres-cles__item"
    >
      <b class="chiffres-cles__value">{{ chiffre.value }}</b>
      <span v-if="chiffre.unit" class="chiffres-cles__unit">{{
        chiffre.unit
      }}</span>
      <span class="chiffres-cles__label">{{ chiffre.label }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/scss/abstracts/variables" as *;
@use "~/assets/scss/abstracts/mixins" as *;
.chiffres-cles {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  &__item {
    background: var(--color-surface-alt);
    border-radius: 6px;
    padding: 1rem;
    text-align: center;
  }

  &__value {
    display: block;
    font-family: $font-display;
    font-size: $fs-h2;
    font-weight: $fw-semibold;
    color: var(--color-accent-text);
  }

  &__unit,
  &__label {
    display: block;
    font-size: $fs-eyebrow;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: $ls-wide;
  }

  &__label {
    margin-top: 0.3rem;
  }
}
</style>
