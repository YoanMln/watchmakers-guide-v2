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
  gap: clamp(1.5rem, 4vw, 4rem);
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
    background: rgba(0, 0, 0, 0.898);
    border-color: $bronze;
    box-shadow: 0 15px 30px rgba($bronze, 0.2);
    h3 {
      color: $bronze;
    }
  }
  &__numeral {
    margin: 0;
    font-family: "Alumni Sans", sans-serif;
    font-size: 4rem;
    color: $bronze;
    line-height: 1;
  }
  &__title {
    margin: 0;
    font-family: "Alumni Sans", sans-serif;
    font-size: 1.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $light;
  }
  &__desc {
    margin-top: 1rem;
    font-size: 0.9rem;
    line-height: 1.6;
    color: $light;
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
