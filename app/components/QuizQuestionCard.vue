<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import gsap from "gsap";

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  questionNumber: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  showFeedback: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["answer"]);

const card = ref(null);

let ctx;
let reduceMotionQuery;
let updateMotionPreference;
let shouldReduceMotion = false;
let handleMouseMove = () => {};
let resetCard = () => {};

onMounted(() => {
  if (!card.value) return;

  reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  shouldReduceMotion = reduceMotionQuery.matches;
  updateMotionPreference = (event) => {
    shouldReduceMotion = event.matches;

    if (shouldReduceMotion) {
      resetCard();
    }
  };
  reduceMotionQuery.addEventListener("change", updateMotionPreference);

  ctx = gsap.context((_, contextSafe) => {
    const safe = contextSafe || ((fn) => fn);

    handleMouseMove = safe((event) => {
      if (!card.value || props.showFeedback || shouldReduceMotion) return;

      gsap.to(card.value, {
        rotateY: (event.clientX / window.innerWidth - 0.5) * 20,
        rotateX: -(event.clientY / window.innerHeight - 0.5) * 20,
        transformPerspective: 1200,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    resetCard = safe(() => {
      if (!card.value) return;

      gsap.to(card.value, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  }, card.value);

  window.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseleave", resetCard);
  window.addEventListener("blur", resetCard);
});

onUnmounted(() => {
  if (reduceMotionQuery && updateMotionPreference) {
    reduceMotionQuery.removeEventListener("change", updateMotionPreference);
  }

  window.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseleave", resetCard);
  window.removeEventListener("blur", resetCard);
  ctx?.revert();
});

watch(
  () => [props.showFeedback, props.questionNumber],
  () => {
    resetCard();
  },
);
</script>

<template>
  <div class="quiz-question-card__info-container">
    <p class="quiz-question-card__info">
      Question :
      <span>{{ questionNumber }} / {{ totalQuestions }}</span>
    </p>

    <p class="quiz-question-card__info">
      Score :
      <span>{{ score }}</span>
    </p>

    <p class="quiz-question-card__info">
      Difficulté :
      <span>{{ difficulty }}</span>
    </p>
  </div>

  <div ref="card" class="quiz-question-card">
    <h2 class="quiz-question-card__title">
      {{ question.question }}
    </h2>

    <div class="quiz-question-card__answers">
      <button
        v-for="(answer, index) in question.answers"
        :key="index"
        type="button"
        class="quiz-question-card__answer"
        :disabled="showFeedback"
        :focus-visible
        @click="emit('answer', index)"
      >
        <Icon name="mdi:gear-outline" class="quiz-question-card__icon" />
        {{ answer }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/scss/abstracts/variables" as *;
@use "~/assets/scss/abstracts/mixins" as *;

.quiz-question-card {
  @include quiz-card;
  width: min(520px, 100%);
  margin-top: 2rem;
  margin-inline: auto;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform;

  &__info-container {
    display: flex;
    justify-content: center;
    gap: 5rem;
  }

  &__info {
    span {
      color: var(--color-accent-text);
      font-weight: 600;
    }
  }

  &__title {
    position: relative;
    z-index: 1;
    margin: auto 0;
    text-align: center;
    font-size: clamp(1.6rem, 2vw, 2rem);
    font-weight: 400;
    line-height: 1.5;
    text-wrap: balance;
  }

  &__answers {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin-top: 4rem;
  }

  &__answer {
    all: unset;
    display: flex;
    align-items: center;
    gap: 0.4rem;

    cursor: pointer;
    border-radius: 12px;
    transition: 0.25s ease;

    &:hover {
      color: var(--color-accent-text);
      transform: translateX(6px);
    }
  }
  &__icon {
    flex-shrink: 0;
    color: $bronze;
  }
}
</style>
