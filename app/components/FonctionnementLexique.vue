<script setup>
defineProps({
  termes: { type: Array, required: true },
});
</script>

<template>
  <dl class="lexique">
    <div v-for="(terme, index) in termes" :key="index" class="lexique__entry">
      <dt class="lexique__term">{{ terme.term }}</dt>
      <dd class="lexique__definition">{{ terme.definition }}</dd>
    </div>
  </dl>
</template>

<style scoped lang="scss">
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
    font-family: "Cormorant Garamond", serif;
    font-style: italic;
    color: #ad856f;
    font-size: 1.8rem;
  }

  &__definition {
    margin: 0.8rem 0 0;
    font-size: 1.1rem;
    color: #a9a49c;
    line-height: 1.4;
  }
}
</style>
