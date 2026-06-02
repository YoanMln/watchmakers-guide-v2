<script setup>
const route = useRoute();
const menuOpen = ref(false);
const isScrolled = ref(false);
const lastScrollTop = ref(0);

const isHomePage = computed(() => route.path === "/");

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
  <nav :class="{ hide: isHomePage, scrolled: isScrolled }">
    <div class="nav-logo">
      <NuxtLink to="/">
        <img
          src="~/assets/images/logo/logo.webp"
          alt="logo du site Watchmaker's Guide"
        />
      </NuxtLink>
    </div>

    <ul class="nav-menu" :class="{ active: menuOpen }">
      <li><NuxtLink to="/" @click="closeMenu">Accueil</NuxtLink></li>
      <li><NuxtLink to="/decouvrir" @click="closeMenu">Découvrir</NuxtLink></li>
      <li>
        <NuxtLink to="/fonctionnement" @click="closeMenu"
          >Fonctionnement</NuxtLink
        >
      </li>
      <li>
        <NuxtLink to="/outils" @click="closeMenu"
          >Outils de l'horloger</NuxtLink
        >
      </li>
      <li>
        <NuxtLink to="/techniques" @click="closeMenu">Techniques</NuxtLink>
      </li>
    </ul>

    <div class="nav-burger" :class="{ active: menuOpen }" @click="toggleMenu">
      <div class="ligne"></div>
      <div class="ligne"></div>
      <div class="ligne"></div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  &.hide {
    display: none;
  }

  &.scrolled {
    top: -100px;
  }
}
</style>