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
      { name: "Raleway", weights: [200, 300, 400, 500, 600, 700] },
      { name: "Montserrat", weights: [200, 300, 400, 500, 600, 700] },
      { name: "Jost", weights: [100, 200] },
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
      link: [
        {
          rel: "icon",
          href: "/favicon.ico",
          sizes: "16x16 32x32 48x48 64x64 128x128",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-96x96.png",
          sizes: "96x96",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-192x192.png",
          sizes: "192x192",
        },
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
          sizes: "180x180",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      meta: [{ name: "theme-color", content: "#16181a" }],
    },
  },
});
