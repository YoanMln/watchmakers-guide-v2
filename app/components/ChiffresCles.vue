<script setup>
defineProps({
  chiffres: { type: Array, required: true },
});
</script>

<template>
  <div class="chiffres-cles">
    <div
      v-for="(chiffre, index) in chiffres"
      :key="index"
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
.chiffres-cles {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  &__item {
    background: #161616;
    border-radius: 6px;
    padding: 1rem;
    text-align: center;
  }

  &__value {
    display: block;
    font-family: "Cormorant Garamond", serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: #ad856f;
  }

  &__unit,
  &__label {
    display: block;
    font-size: 0.8rem;
    color: #a9a49c;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  &__label {
    margin-top: 0.3rem;
  }
}
</style>
