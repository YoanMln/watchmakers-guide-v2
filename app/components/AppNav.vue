<script setup>
const route = useRoute();
const menuOpen = ref(false);
const isScrolled = ref(false);
const lastScrollTop = ref(0);

const isHomePage = computed(() => route.path === "/");
const isDiscoveryPage = computed(() => route.path === "/decouvrir");

const navLeft = [
  { to: "/decouvrir", label: "Découvrir" },
  { to: "/fonctionnement", label: "Fonctionnement" },
];
const navRight = [
  { to: "/outils", label: "Outils de l'horloger" },
  { to: "/techniques", label: "Techniques" },
];
const navAll = [...navLeft, ...navRight];

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

const handleScroll = () => {
  const scrollTop = window.scrollY;

  if (scrollTop <= 50) {
    isScrolled.value = false;
  } else if (scrollTop > lastScrollTop.value) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }

  lastScrollTop.value = scrollTop;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav
    class="main-nav"
    :class="{ 'home-desktop-hidden': isHomePage, scrolled: isScrolled }"
  >
    <div class="nav-side">
      <button
        class="nav-burger"
        :class="{ active: menuOpen }"
        type="button"
        :aria-expanded="menuOpen"
        aria-label="Ouvrir le menu"
        @click="toggleMenu"
      >
        <span class="ligne" />
        <span class="ligne" />
        <span class="ligne" />
      </button>

      <ul class="nav-list">
        <li v-for="link in navLeft" :key="link.to">
          <NuxtLink :to="link.to" @click="closeMenu">{{ link.label }}</NuxtLink>
        </li>
      </ul>
    </div>

    <NuxtLink to="/" class="nav-brand" @click="closeMenu">
      <picture>
        <source
          media="(max-width: 580px)"
          srcset="/images/logo/brand-logo-mobile.webp"
          width="330"
          height="330"
        />
        <img
          class="brand-logo"
          src="/images/logo/brand-logo.webp"
          alt="Accueil"
          width="1696"
          height="927"
        />
      </picture>
    </NuxtLink>

    <div class="nav-side nav-side--right">
      <ul class="nav-list">
        <li v-for="link in navRight" :key="link.to">
          <NuxtLink :to="link.to" @click="closeMenu">{{ link.label }}</NuxtLink>
        </li>
      </ul>
      <ColorModeToggle v-if="!isDiscoveryPage" />
    </div>
  </nav>

  <div class="nav-panel" :class="{ active: menuOpen }" :inert="!menuOpen">
    <ul class="nav-list nav-list--panel">
      <li v-for="link in navAll" :key="link.to">
        <NuxtLink :to="link.to" @click="closeMenu">{{ link.label }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.main-nav {
  &.home-desktop-hidden {
    @media (min-width: 781px) {
      display: none;
    }
  }

  &.scrolled {
    top: -100px;
  }
}
</style>
