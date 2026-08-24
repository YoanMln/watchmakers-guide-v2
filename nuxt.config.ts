// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/scss/main.scss"],
  modules: [
    "@nuxt/icon",
    "@nuxt/eslint",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@netlify/nuxt",
    "@nuxtjs/seo",
    "@nuxt/fonts",
  ],
  fonts: {
    families: [
      {
        name: "Raleway",
        weights: [100, 200, 400],
      },
      {
        name: "Jost",
        weights: [100, 200],
      },
    ],
  },
  site: {
    url: "https://watchmakersguide.com",
    name: "Watchmaker's Guide",
    description:
      "Le guide illustré de l'horlogerie mécanique : fonctionnement, complications, outils et techniques de l'horloger.",
    defaultLocale: "fr",
  },
  seo: {
    meta: {
      ogLocale: "fr_FR",
      ogImage: "/images/background/og/og-background.jpg",
      twitterCard: "summary_large_image",
    },
  },
  ogImage: { enabled: false },
  colorMode: {
    preference: "dark",
    fallback: "dark",
  },
  image: {
    provider: "netlify",
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "fr",
      },
    },
  },
});
