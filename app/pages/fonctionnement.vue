<script setup>
import fonctionnementdata from "~/data/fonctionnement/fonctionnement-data.json";
import watchParts from "~/data/fonctionnement/watchParts.json";
useSeoMeta({
  title: "Fonctionnement d'un mouvement mécanique | Watchmakers Guide",
  description:
    "Découvrez le fonctionnement d'une montre mécanique : du barillet au balancier, en passant par les rouages et l'échappement, tout est expliqué simplement et clairement.",
});
const etapes = fonctionnementdata.etapes;
</script>

<template>
  <article class="fonctionnement">
    <PageHeader
      title="Le mouvement mécanique simple"
      subtitle="Découvrez comment l'énergie mécanique se transforme en mesure précise du temps."
    />

    <div class="card-watch-parts">
      <h2>Les parties de la montre</h2>
      <p class="intro-card">Cliquez sur chaque pièce pour en savoir plus</p>
      <WatchExplode :parts="watchParts" />
    </div>

    <div class="fonctionnement-details">
      <div
        v-for="etape in etapes"
        :key="etape.titre"
        class="card-fonctionnement"
      >
        <div class="steps-content">
          <h2 class="card-title">{{ etape.titre }}</h2>
          <p class="resume-details">{{ etape.texte }}</p>
        </div>
        <div class="schema-fonctionnement">
          <img
            class="watch-parts"
            :src="`/images/fonctionnement/parts/${etape.image}`"
            :alt="etape.alt"
          >
        </div>
      </div>
    </div>
  </article>
</template>
