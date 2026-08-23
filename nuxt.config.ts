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
  ],
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
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Alumni+Sans:ital,wght@0,100..900;1,100..900&display=swap",
        },
      ],
    },
  },
});
