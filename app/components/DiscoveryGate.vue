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
  --gate-width: 700px;
  --gate-image-height: 68%;
  --gate-padding: 2.5rem;
  --gate-button-gap: 2.5rem;
  --gate-underline-width: 30%;

  @include card-style;
  @include liquid-glass-border;

  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  width: min(var(--gate-width), 100%);
  height: 700px;
  border: none;
  text-decoration: none;
  color: $on-media;
  background: #030508;
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease;

  &::before {
    display: none;
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(-6px);

      .discovery-gate__button::after {
        width: 100%;
      }
    }
  }

  &__illu {
    display: block;
    width: 100%;
    height: var(--gate-image-height);
    flex: none;
    object-fit: cover;
  }

  // ---------------- CONTENT ----------------

  &__body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
    min-height: 0;
    padding: var(--gate-padding);
    background:
      radial-gradient(
        circle at 70% 0%,
        rgba(255, 255, 255, 0.025),
        transparent 45%
      ),
      #030508;
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
    display: flex;
    align-items: center;
    justify-content: center;

    color: $on-media;
    cursor: pointer;
    line-height: 1;
    font-size: $fs-h1;
    transition: transform 0.25s ease;
    &:focus-visible {
      outline: 2px solid rgba($bronze, 0.8);
      outline-offset: 2px;
    }
    &:hover {
      transform: rotate(90deg);
    }
  }

  &__title {
    margin: 0;
    font-size: $fs-section;
    color: $on-media;

    @include mobile {
      font-size: $fs-section-mobile;
    }
  }

  &__description {
    max-width: 60ch;
    margin: 1.25rem 0 0;
    color: rgba($on-media, 0.8);
    line-height: 1.7;
  }

  &__button {
    @include animate-underline;
    margin-top: auto;
    color: $on-media;
    font-size: $fs-body-lg;

    @include mobile {
      font-size: $fs-body-lg-mobile;
    }

    &::after {
      width: var(--gate-underline-width);
    }
  }
}

// ---------------- RESPONSIVE ----------------

@media (max-width: 1024px) {
  .discovery-gate {
    --gate-image-height: 64%;
    --gate-padding: 2rem;
    --gate-button-gap: 2rem;
    --gate-underline-width: 45%;
    height: 600px;
  }

  .discovery-gate__title {
    font-size: $fs-h3-mobile;
  }
}

@media (max-width: 480px) {
  .discovery-gate {
    --gate-image-height: 58%;
    --gate-padding: 1.5rem;
    --gate-button-gap: 1.5rem;
    --gate-underline-width: 60%;
    height: 500px;
  }

  .discovery-gate__description {
    line-height: 1.5;
  }
}
</style>
