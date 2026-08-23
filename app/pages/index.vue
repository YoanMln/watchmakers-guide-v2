<script setup>
useHead({
  bodyAttrs: {
    "data-page": "home",
  },
});
useSeoMeta({
  title: "Comprendre l'horlogerie mécanique",
  description:
    "Comment fonctionne une montre mécanique ? Complications, histoire de la mesure du temps, outils et techniques de l'horloger : le guide illustré",
});
</script>

<template>
  <header>
    <div class="header-container">
      <div class="title-h1">
        <p class="brand-wordmark">Watchmaker's Guide</p>
        <h1>Comprendre l'horlogerie mécanique</h1>
      </div>

      <div class="intro-container">
        <p class="header-tagline">
          Explorez la précision et la passion de l'horlogerie à travers un
          regard technique et authentique
        </p>
      </div>
      <div class="btn-container-home">
        <NuxtLink class="btn-cta" to="/decouvrir"
          >Découvrir l'horlogerie</NuxtLink
        >
      </div>
      <div class="nav-home">
        <ul class="nav-home-list">
          <li>
            <NuxtLink to="/fonctionnement"> Fonctionnement</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/outils">Outils de l'horloger</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/techniques">Techniques</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
