<script setup>
import { computed } from "vue";
const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  buttonLabel: { type: String, required: true },
  to: { type: String, required: true },
  image: { type: String, required: true },
  imageFit: { type: String, default: "100%" },
});

const gateClasses = computed(() => ["discovery-gate"]);

const gateStyle = computed(() => ({
  "--gate-image-src": `url(${props.image})`,
  "--gate-bg-size": props.imageFit,
}));
defineEmits(["close"]);
</script>

<template>
  <NuxtLink :to="to" :class="gateClasses" :style="gateStyle">
    <NuxtImg class="discovery-gate__illu" :src="image" alt="" loading="lazy" />
    <div class="discovery-gate__body">
      <div class="discovery-gate__header">
        <h2 class="discovery-gate__title">{{ title }}</h2>
        <button
          type="button"
          class="discovery-gate__close"
          aria-label="Fermer"
          @click.stop.prevent="$emit('close')"
        >
          <Icon name="ei:close-o" />
        </button>
      </div>
      <p class="discovery-gate__description">
        {{ description }}
      </p>
      <span class="discovery-gate__button">
        {{ buttonLabel }}
      </span>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
@use "~/assets/scss/abstracts/variables" as *;
@use "~/assets/scss/abstracts/mixins" as *;

.discovery-gate {
  /* ----------  responsive ---------- */
  --gate-bg-image: var(--gate-image-src);
  --gate-min-height: 550px;
  --gate-width: 700px;
  --gate-padding: 3rem;
  --gate-title-size: 2.8rem;
  --gate-button-gap: 3rem;
  --gate-button-size: 1.1rem;
  --gate-underline-width: 30%;
  /* ----------------------- */
  @include card-style;
  @include liquid-glass-border;

  background-size: var(--gate-bg-size);
  background-repeat: no-repeat;
  background-position: center;
  background-image:
    linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.58) 0%,
      rgba(0, 0, 0, 0.38) 50%,
      rgba(0, 0, 0, 0.08) 100%,
      transparent 100%
    ),
    var(--gate-bg-image);

  &::before {
    display: none;
  }
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  min-height: var(--gate-min-height);
  width: var(--gate-width);
  border: none;
  text-decoration: none;
  color: $on-media;
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-6px);

      .discovery-gate__button::after {
        width: 100%;
      }
    }
  }

  &__illu {
    display: none;
    width: 100%;
    height: 250px;
    object-fit: contain;
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: flex-start;
    padding: var(--gate-padding);
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
  }

  &__close {
    all: unset;
    color: white;
    cursor: pointer;
    line-height: 1;
    font-size: 2.3rem;
  }

  &__title {
    margin-bottom: 1rem;
    font-size: var(--gate-title-size);
    color: $on-media;
  }
  &__description {
    max-width: 60ch;
    margin-bottom: auto;
    color: rgba($on-media, 0.8);
    line-height: 1.7;
  }
  &__button {
    @include animate-underline;
    margin-top: var(--gate-button-gap);
    color: $on-media;
    font-size: var(--gate-button-size);

    &::after {
      width: var(--gate-underline-width);
    }
  }
}

/* ------------------ RESPONSIVE ------------------ */

@media (max-width: 1024px) {
  .discovery-gate {
    --gate-bg-image: none;
    --gate-padding: 2rem;
    --gate-title-size: 2.2rem;
    --gate-button-gap: 2rem;
    --gate-button-size: 0.875rem;
    --gate-underline-width: 45%;
  }
}

@media (max-width: 768px) {
  .discovery-gate {
    --gate-title-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .discovery-gate {
    --gate-padding: 1.5rem;
    --gate-title-size: 1.5rem;
    --gate-button-gap: 1.5rem;
    --gate-underline-width: 60%;
  }
}
</style>
