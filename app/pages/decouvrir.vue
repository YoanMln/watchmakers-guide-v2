<script setup>
import gateCard from "~/data/decouvrir/gate-card.json";
import { computed } from "vue";
import gsap from "gsap";

useSeoMeta({
  title: "Découvrir l'univers de l'horlogerie",
  description:
    "Histoire de la mesure du temps, complications horlogères, quiz : choisissez votre porte d'entrée dans l'univers de l'horlogerie mécanique",
});

definePageMeta({
  colorMode: "dark",
});
const route = useRoute();

const cardGate = computed(() => gateCard);
const tickCount = 72;
const page = ref(null);

onMounted(() => {
  if (!page.value) return;
  const q = gsap.utils.selector(page.value);
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;
  gsap.set(q(".celestial__moon, .celestial__ring--solid, .celestial__ticks"), {
    xPercent: -50,
    yPercent: -50,
  });
  gsap.to(q(".celestial__moon"), {
    filter: "brightness(0.1)",
    duration: 6,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
  gsap
    .timeline({ defaults: { ease: "power2.out" } })

    .from(q(".discovery-backdrop"), {
      opacity: 0,
      duration: 0.9,
      ease: "power1.out",
    })
    .from(q(".page-header__title"), { opacity: 0, y: 20, duration: 0.6 }, "<")
    .from(q(".page-header__sub"), { opacity: 0, y: 14, duration: 0.5 }, "<0.1")
    .from(
      q(".celestial__ring--solid"),
      { opacity: 0, rotation: "-=9", duration: 0.5 },
      "-=0.5"
    )
    .from(
      q(".celestial__ticks"),
      { opacity: 0, rotation: "-=8", duration: 0.5 },
      "-=0.25"
    )
    .to(
      q(".celestial__ticks"),
      { rotation: "+=20", duration: 2, ease: "power2.inOut" },
      "<"
    )

    .from(
      q(".celestial__moon"),
      { opacity: 0, scale: 0.85, duration: 0.5 },
      "<"
    )
    .from(
      q(".discovery-hotspots"),
      { opacity: 0, rotation: "-=8", duration: 0.5 },
      "<"
    );
});
</script>

<template>
  <div ref="page">
    <div class="discovery-backdrop" aria-hidden="true" />
    <PageHeader
      title="Découvrez l’univers de l’horlogerie"
      subtitle="Explorez son histoire, testez vos connaissances et plongez dans ses plus grands secrets."
    />
    <div class="celestial-stage">
      <div class="celestial" aria-hidden="true">
        <div class="celestial__ring celestial__ring--solid" />
        <div class="celestial__ticks">
          <svg
            class="celestial__ticks-svg"
            viewBox="0 0 400 400"
            aria-hidden="true"
          >
            <g
              v-for="n in tickCount"
              :key="n"
              :transform="`rotate(${(360 / tickCount) * n} 200 200)`"
            >
              <line
                x1="200"
                y1="14"
                x2="200"
                y2="28"
                stroke="rgba(255, 255, 255, 0.5)"
                stroke-width="0.5"
              />
            </g>
          </svg>
        </div>
        <div class="celestial__moon" />
      </div>
      <DiscoveryHotSpot :card-gate="cardGate" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.discovery-backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(
      circle at 50% 45%,
      rgba(20, 35, 65, 0.8) 0%,
      rgba(8, 15, 30, 0.95) 35%,
      #020308 75%
    ),
    #020308;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(
        circle,
        rgba(255, 255, 255, 0.9) 0 1px,
        transparent 1.5px
      ),
      radial-gradient(
        circle,
        rgba(255, 255, 255, 0.7) 0 1px,
        transparent 1.5px
      ),
      radial-gradient(circle, rgba(255, 255, 255, 0.5) 0 1px, transparent 1.5px);
    background-size:
      170px 170px,
      250px 250px,
      320px 320px;
    background-position:
      10px 20px,
      80px 120px,
      160px 40px;
    opacity: 0.7;
  }
}

.celestial-stage {
  position: relative;
  min-height: 75vh;
  top: 3rem;
}

.celestial {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
}

.celestial__ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.celestial__ring--solid {
  width: 73vmin;
  aspect-ratio: 1;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.celestial__ticks {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vmin;
  height: 60vmin;
}

.celestial__ticks-svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.celestial__moon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 15rem;
  height: 15rem;
  background: url("/images/background/moon.webp") center/contain no-repeat;
  border-radius: 50%;
  filter: brightness(0.7);
}

@media (max-width: 768px) {
  .celestial-stage {
    top: -4rem;
  }
  .celestial__ring--solid {
    width: 100vmin;
  }
  .celestial__ticks {
    width: 70vmin;
    height: 70vmin;
  }
}
</style>
