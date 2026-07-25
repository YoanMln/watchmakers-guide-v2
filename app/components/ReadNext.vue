<!-- components/ReadNext.vue -->
<script setup>
defineProps({
  items: { type: Array, required: true },
});
</script>

<template>
  <div class="read-next">
    <NuxtLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="read-next__item"
    >
      <span class="read-next__arrow">→</span>
      <h4 class="read-next__title">{{ item.title }}</h4>
      <p class="read-next__text">{{ item.text }}</p>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.read-next {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 5rem 1rem 5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  &__item {
    display: block;
    border: 1px solid rgba(173, 133, 111, 0.3);
    border-radius: 8px;
    padding: 1.5rem 1.2rem;
    text-decoration: none;
    transition:
      border-color 0.25s,
      transform 0.25s;

    &:hover {
      border-color: #ad856f;
      transform: translateY(-2px);
    }
  }

  &__arrow {
    color: #ad856f;
    font-family: "Cormorant Garamond", serif;
    font-size: 1.2rem;
  }

  &__title {
    margin: 0.3rem 0 0.4rem;
    font-size: 1.5rem;
    color: #fff;
  }

  &__text {
    margin: 0;
    font-size: 1rem;
    color: #a9a49c;
    line-height: 1.5;
  }
}
</style>
