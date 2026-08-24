<script setup>
const emit = defineEmits(["select"]);

const difficultyLevels = [
  {
    value: "novice",
    numeral: "I",
    label: "Novice",
    description: "Vocabulaire, pièces visibles et marques emblématiques",
  },
  {
    value: "horloger",
    numeral: "II",
    label: "Horloger",
    description: "Mécanismes internes, réglage et complications classiques",
  },
  {
    value: "maitre horloger",
    numeral: "III",
    label: "Maître-horloger",
    description: "Haute fréquence, tourbillon et régulation avancée",
  },
];
</script>

<template>
  <div class="difficulty-selection">
    <div class="container-card-difficulty">
      <button
        v-for="level in difficultyLevels"
        :key="level.value"
        :type="button"
        class="card-difficulty"
        @click="emit('select', level.value)"
      >
        <p class="card-difficulty__numeral">
          {{ level.numeral }}
        </p>
        <h3 class="card-difficulty__title">
          {{ level.label }}
        </h3>
        <p class="card-difficulty__desc">
          {{ level.description }}
        </p>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/scss/abstracts/variables" as *;
@use "~/assets/scss/abstracts/mixins" as *;

.container-card-difficulty {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 4rem;
  align-items: center;
  justify-content: center;
  margin: 3rem auto 0;
}
.card-difficulty {
  @include quiz-card;
  width: 100%;
  max-width: 480px;
  justify-self: center;
  transition: 0.3s;
  cursor: pointer;
  animation: levitate 2.5s ease-in-out infinite;

  &:hover {
    animation-play-state: paused;
    transform: translateY(-4px);
    background: $media-card;
    border-color: $bronze;
    box-shadow: 0 15px 30px rgba($bronze, 0.2);
    h3 {
      color: var(--color-accent-text);
    }
  }
  &__numeral {
    margin: 0;
    font-family: $font-display;
    font-size: $fs-page-title;
    color: var(--color-accent-text);
    line-height: 1;
  }
  &__title {
    margin: 0;
    font-family: $font-display;
    font-size: $fs-h2;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $on-media;
  }
  &__desc {
    margin-top: 1rem;
    font-size: $fs-sm;
    line-height: 1.6;
    color: $on-media;
  }
}

@keyframes levitate {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
</style>
