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
