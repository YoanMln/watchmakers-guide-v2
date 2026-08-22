<script setup>
import navigation from "~/data/navigation.json";

const footerSections = [
  {
    title: "L'atelier",
    links: navigation.filter((item) => item.group === "atelier"),
  },
  {
    title: "L'univers horloger",
    links: navigation.filter((item) => item.group === "univers"),
  },
];
</script>

<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__brand">
        <p class="footer__name">Watchmaker's Guide</p>
        <NuxtLink class="footer__gate" to="/decouvrir">
          Découvrir l'horlogerie
        </NuxtLink>
      </div>

      <nav class="footer__nav" aria-label="Plan du site">
        <div
          v-for="section in footerSections"
          :key="section.title"
          class="footer__group"
        >
          <p class="footer__group-title">{{ section.title }}</p>
          <ul class="footer__list">
            <li v-for="link in section.links" :key="link.to">
              <NuxtLink :to="link.to">{{ link.labelLong }}</NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <p class="footer__text">
      &copy; 2026 Watchmaker's Guide — Tous droits réservés.
    </p>
  </footer>
</template>
