<script setup>
import { computed } from "vue";
const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  buttonLabel: { type: String, required: true },
  to: { type: String, required: true },
  size: {
    type: String,
    required: true,
    validator: (value) => ["large", "small"].includes(value),
  },
  variant: { type: String, required: true },
  image: { type: String, required: true },
});

const gateClasses = computed(() => [
  "discovery-gate",
  `discovery-gate--${props.size}`,
  `discovery-gate--${props.variant}`,
]);

const gateStyle = computed(() => ({
  "--gate-image-src": `url(${props.image})`,
}));
</script>

<template>
  <NuxtLink :to="to" :class="gateClasses" :style="gateStyle">
    <NuxtImg class="discovery-gate__illu" :src="image" alt="" loading="lazy" />

    <div class="discovery-gate__body">
      <h2 class="discovery-gate__title">{{ title }}</h2>
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
  --gate-min-height: auto;
  --gate-padding: 3rem;
  --gate-title-size: 2.8rem;
  --gate-button-gap: 3rem;
  --gate-button-size: 0.95rem;
  --gate-underline-width: 30%;
  /* ----------------------- */
  @include card-style;
  &::before {
    display: none;
  }
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  min-height: var(--gate-min-height);
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
    aspect-ratio: 16 / 9;
    max-height: 320px;
    object-fit: contain;
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: flex-start;
    padding: var(--gate-padding);
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

  /* ---------- Sizes ---------- */

  &--large {
    --gate-min-height: 600px;
  }
  &--small {
    --gate-min-height: 300px;
  }

  /* ---------- Variants ---------- */

  &--timeline {
    --gate-illu-size: 550px;
    --gate-illu-position: center 65%;

    background-image:
      var(--gate-bg-image),
      radial-gradient(
        ellipse 900px 420px at 8% 95%,
        rgba($bronze, 0.18) 0%,
        transparent 70%
      ),
      linear-gradient(180deg, #05070d 0%, #1c2740 55%, #47576f 100%);
    background-repeat: no-repeat, no-repeat, no-repeat;
    background-position: var(--gate-illu-position), center, center;
    background-size: var(--gate-illu-size), cover, cover;
  }

  &--complication {
    --gate-illu-size: 720px;
    --gate-illu-position: center calc(50% + 80px);

    @include background-blueprint-with-image(
      var(--gate-bg-image),
      var(--gate-illu-size),
      var(--gate-illu-position),
      var(--color-blueprint)
    );

    .discovery-gate__title,
    .discovery-gate__button {
      color: var(--color-blueprint-text);
    }

    .discovery-gate__description {
      color: var(--color-blueprint-text);
      opacity: 0.8;
    }
  }

  &--quiz {
    --gate-illu-size: cover;
    --gate-illu-position: left top;

    background-image: var(--gate-bg-image);
    background-repeat: no-repeat;
    background-position: var(--gate-illu-position);
    background-size: var(--gate-illu-size);
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

    &--large,
    &--small {
      --gate-min-height: auto;
    }

    &__illu {
      display: block;
    }

    &--complication &__illu {
      aspect-ratio: 4 / 3;
      max-height: 320px;
    }
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
