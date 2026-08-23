<script setup>
import gsap from "gsap";

const props = defineProps({
  parts: { type: Array, required: true },
});

const partRefs = ref([]);
const activeId = ref(null);

const activePart = computed(
  () => props.parts.find((p) => p.id === activeId.value) || null,
);

function toggle(part) {
  activeId.value = activeId.value === part.id ? null : part.id;

  props.parts.forEach((p, i) => {
    const el = partRefs.value[i];
    if (!el) return;
    const isTarget = p.id === activeId.value;
    const hasActive = !!activeId.value;

    gsap.to(el, {
      y: isTarget ? p.animation.activeY : p.animation.startY,
      scale: isTarget ? p.animation.scale : 1,
      rotation: isTarget ? p.animation.rotate : 0,
      opacity: hasActive && !isTarget ? 0.15 : 1,
      duration: 0.5,
      ease: "power2.out",
    });
  });
}

function close() {
  activeId.value = null;
}

function onKeydown(e) {
  if (e.key === "Escape") close();
}

onMounted(() => {
  props.parts.forEach((part, i) => {
    gsap.set(partRefs.value[i], {
      y: part.animation.startY,
      zIndex: part.animation.zIndex,
    });
  });
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <div class="watch-explode">
    <div
      v-for="part in parts"
      :key="part.id"
      class="watch-explode__wrap"
      :style="{ zIndex: part.animation.zIndex }"
    >
      <img
        ref="partRefs"
        :src="part.image"
        :alt="part.title"
        class="watch-explode__part"
      >
    </div>

    <button
      v-for="part in parts"
      :key="part.id + '-hotspot'"
      type="button"
      class="watch-explode__hotspot"
      :class="{ 'is-active': activeId === part.id }"
      :style="{ top: part.hotspot.top, left: part.hotspot.left }"
      :aria-label="part.title"
      @click="toggle(part)"
    >
      +
    </button>

    <Transition name="popover">
      <div
        v-if="activePart"
        class="watch-explode__popover"
        role="dialog"
        aria-modal="true"
        :aria-label="activePart.title"
        :style="{ top: activePart.popover.top, left: activePart.popover.left }"
      >
        <button
          type="button"
          class="watch-explode__close"
          aria-label="Fermer"
          @click="close"
        >
          ×
        </button>
        <h3>{{ activePart.title }}</h3>
        <p>{{ activePart.description }}</p>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/abstracts/variables" as *;

.watch-explode {
  position: relative;
  width: 100%;
  height: 700px;

  &__wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__part {
    display: block;
    max-width: 340px;
    height: auto;
  }

  &__hotspot {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid rgba($on-media, 0.4);
    background: $bronze;
    color: $on-accent;
    font-size: 1.2rem;
    line-height: 1;
    cursor: pointer;
    z-index: 10;
    transition:
      box-shadow 0.3s,
      transform 0.3s;

    &:hover {
      transform: translate(-50%, -50%) scale(1.08);
    }

    &.is-active {
      box-shadow: 0 0 0 6px rgba($bronze, 0.25);
    }
  }

  &__popover {
    position: absolute;
    transform: translate(-50%, 0);
    width: 260px;
    padding: 1rem 1.25rem;
    background: var(--color-surface);
    color: var(--color-text);
    border: 1px solid rgba($bronze, 0.4);
    border-radius: 8px;
    z-index: 20;

    h3 {
      margin: 0 0 0.4rem;
      font-size: 1.5rem;
      color: var(--color-accent-text);
    }

    p {
      margin: 0;
      font-size: 1rem;
      line-height: 1.4;
    }
  }

  &__close {
    display: none;
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

@media (max-width: 1280px) {
  .watch-explode__popover {
    position: fixed !important;
    top: auto !important;
    left: 0 !important;
    right: 0;
    bottom: 0;
    transform: none;
    width: 100%;
    max-width: none;
    max-height: 70vh;
    overflow-y: auto;
    border-radius: 16px 16px 0 0;
  }

  .watch-explode__close {
    display: block;
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: var(--color-text-muted);
    font-size: 1.1rem;
    cursor: pointer;

    &:hover {
      color: var(--color-accent-text);
    }
  }
}
</style>
