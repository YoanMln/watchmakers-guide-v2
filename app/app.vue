<script setup>
useHead({
  titleTemplate: (titleChunk) =>
    titleChunk ? `${titleChunk} | Watchmaker's Guide` : "Watchmaker's Guide",
});
</script>

<template>
  <div class="app" :data-page="$route.name">
    <NuxtRouteAnnouncer />
    <AppNav />
    <main>
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>
