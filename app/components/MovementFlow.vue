<script setup>
const props = defineProps({
  fonctionnements: {
    type: Array,
    required: true,
  },
});

const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const activeId = ref(null);

const activeFonctionnement = computed(
  () =>
    props.fonctionnements.find(
      (fonctionnement) => fonctionnement.id === activeId.value
    ) || null
);

function toggle(fonctionnement) {
  activeId.value =
    activeId.value === fonctionnement.id ? null : fonctionnement.id;
}

function close() {
  activeId.value = null;
}

function onKeydown(e) {
  if (e.key === "Escape") close();
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <div class="movement-flow">
    <img
      src="/images/fonctionnement/movement-flow/movement-explode.webp"
      alt="Fonctionnement du mouvement"
      class="movement-flow__image"
    />

    <button
      v-for="(fonctionnement, index) in props.fonctionnements"
      :key="fonctionnement.id"
      type="button"
      :style="{
        top: fonctionnement.hotspot.top,
        left: fonctionnement.hotspot.left,
      }"
      :class="{ 'is-active': activeId === fonctionnement.id }"
      :aria-label="fonctionnement.title"
      :aria-expanded="activeId === fonctionnement.id"
      class="movement-flow__hotspot"
      @click="toggle(fonctionnement)"
    >
      {{ index + 1 }}
      <span class="movement-flow__hotspot-label">{{
        fonctionnement.title
      }}</span>
    </button>

    <Transition name="popover">
      <div
        v-if="activeFonctionnement"
        class="movement-flow__popover"
        role="dialog"
        :aria-label="activeFonctionnement.title"
        :style="{
          top: activeFonctionnement.popover.top,
          left: activeFonctionnement.popover.left,
        }"
      >
        <button
          type="button"
          class="movement-flow__close"
          aria-label="Fermer"
          @click="close"
        >
          ×
        </button>
        <div class="movement-flow__info-container">
          <div class="movement-flow__specs">
            <span class="movement-flow__rn">
              {{
                roman[
                  props.fonctionnements.findIndex(
                    (f) => f.id === activeFonctionnement.id
                  )
                ]
              }}
            </span>
            <h3>{{ activeFonctionnement.title }}</h3>
            <p>{{ activeFonctionnement.text }}</p>
          </div>
          <div class="movement-flow__img">
            <img
              :src="`/images/fonctionnement/movement-flow/${activeFonctionnement.image}`"
              :alt="activeFonctionnement.alt"
            />
          </div>
        </div>
      </div>
    </Transition>

    <ul class="movement-flow__legend">
      <li
        v-for="(fonctionnement, index) in props.fonctionnements"
        :key="fonctionnement.id + '-legend'"
        :class="{ 'is-active': activeId === fonctionnement.id }"
        @click="toggle(fonctionnement)"
      >
        <span class="movement-flow__rn">{{ roman[index] }}</span>
        {{ fonctionnement.title }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.movement-flow {
  position: relative;
  display: inline-block;
  width: 100%;

  &__image {
    display: block;
    width: 100%;
  }

  &__hotspot {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ad856f;
    border: 1px solid rgba(255, 255, 255, 0.5);
    color: #fff;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    z-index: 10;
    transition:
      transform 0.25s,
      box-shadow 0.25s;

    &::after {
      content: "";
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 1px solid rgba(173, 133, 111, 0.6);
      animation: pulse-ring 2s ease-out infinite;
    }

    &:hover {
      transform: translate(-50%, -50%) scale(1.1);
    }

    &.is-active {
      background: #fff;
      color: #ad856f;

      &::after {
        animation: none;
        opacity: 0;
      }
    }

    &:hover .movement-flow__hotspot-label {
      opacity: 1;
      transform: translate(-50%, -6px);
    }
  }

  &__hotspot-label {
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translate(-50%, 0);
    white-space: nowrap;
    background: #1c1c1c;
    border: 1px solid rgba(173, 133, 111, 0.4);
    color: #f3efe8;
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.2s,
      transform 0.2s;
  }

  &__popover {
    position: absolute;
    transform: translate(-50%, 0);
    width: 600px;
    max-width: 90vw;
    padding: 1.25rem 1.5rem;
    background: #1c1c1c;
    color: #fff;
    border: 1px solid rgba(173, 133, 111, 0.4);
    border-radius: 8px;
    z-index: 20;
  }

  &__close {
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: #a9a49c;
    font-size: 1.1rem;
    cursor: pointer;

    &:hover {
      color: #ad856f;
    }
  }

  &__info-container {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  &__specs {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    h3 {
      margin: 0;
      color: #ad856f;
    }

    p {
      margin: 0;
      line-height: 1.5;
      color: #cfc9c0;
    }
  }

  &__rn {
    font-family: "Cormorant Garamond", serif;
    font-style: italic;
    color: #ad856f;
    font-size: 1rem;
  }

  &__img {
    width: 220px;
    flex-shrink: 0;

    img {
      max-width: 100%;
      height: auto;
      display: block;
      border-radius: 4px;
    }
  }

  &__legend {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem 1.6rem;
    margin: 2rem 0 0;
    padding: 1.2rem 0 0;
    border-top: 1px solid rgba(173, 133, 111, 0.2);

    li {
      cursor: pointer;
      color: #a9a49c;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: color 0.2s;

      &:hover,
      &.is-active {
        color: #f3efe8;
      }

      &.is-active .movement-flow__rn {
        color: #ad856f;
      }
    }
  }
}

@keyframes pulse-ring {
  0% {
    opacity: 0.8;
    transform: scale(0.9);
  }
  100% {
    opacity: 0;
    transform: scale(1.4);
  }
}

.popover-enter-active,
.popover-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.popover-enter-from,
.popover-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}

@media (max-width: 640px) {
  .movement-flow__popover {
    position: fixed !important;
    top: auto !important;
    left: 0 !important;
    right: 0;
    bottom: 0;
    transform: none;
    width: 100%;
    max-width: none;
    border-radius: 16px 16px 0 0;
  }

  .movement-flow__info-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .movement-flow__img {
    width: 100%;
  }
}
</style>
