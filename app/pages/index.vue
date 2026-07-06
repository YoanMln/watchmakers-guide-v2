<script setup>
useHead({
  bodyAttrs: {
    "data-page": "home",
  },
});
</script>

<template>
  <header>
    <div class="header-container">
      <div class="title-h1">
        <h1>Watchmaker's Guide</h1>
      </div>
      <div class="intro-container">
        <h2>
          Explorez la précision et la passion de l’horlogerie à travers un
          regard technique et authentique
        </h2>
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
