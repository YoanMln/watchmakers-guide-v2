<script setup>
import { useColorMode } from "#imports";

const colorMode = useColorMode();

const toggle = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <ClientOnly>
    <button
      class="mode-toggle"
      :aria-label="
        colorMode.value === 'dark'
          ? 'Passer en mode clair'
          : 'Passer en mode sombre'
      "
      @click="toggle"
    >
      <Icon
        :name="colorMode.value === 'dark' ? 'ph:sun-bold' : 'ph:moon-bold'"
        class="mode-toggle__icon"
      />
    </button>

    <template #fallback>
      <div class="mode-toggle mode-toggle--placeholder" />
    </template>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use "~/assets/scss/abstracts/variables" as *;

.mode-toggle {
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-text);
  cursor: pointer;
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease;

  &:hover {
    color: var(--color-text);
    border-color: $bronze;
    transform: rotate(15deg);
  }

  &:focus-visible {
    outline: 2px solid rgba($bronze, 0.8);
    outline-offset: 2px;
  }

  &--placeholder {
    border-color: transparent;
  }
}

.mode-toggle__icon {
  font-size: 1.2rem;
}
</style>
