<script setup>
import movementFlow from "~/data/fonctionnement/movement-flow.json";
import watchParts from "~/data/fonctionnement/watchParts.json";
import chiffresCles from "~/data/fonctionnement/chiffres-cles.json";
import lexique from "~/data/fonctionnement/lexique.json";
import introduction from "~/data/fonctionnement/introduction.json";
import FonctionnementLexique from "~/components/FonctionnementLexique.vue";

useSeoMeta({
  title: "Comment fonctionne une montre mécanique",
  description:
    "Du barillet à l'échappement : découvrez comment l'énergie d'un ressort devient une mesure précise du temps. Anatomie, rouages et lexique de l'horloger.",
});

const readNextItems = [
  {
    to: "/outils",
    title: "Maintenant que vous connaissez le fonctionnement...",
    text: "Découvrez le matériel utilisé par l'horloger pour entretenir un mouvement.",
  },
  {
    to: "/techniques",
    title: "Envie d'aller plus loin ?",
    text: "Apprenez les techniques de démontage et réglage.",
  },
];
</script>

<template>
  <article class="fonctionnement">
    <PageHeader
      title="Le mouvement mécanique simple"
      subtitle="Découvrez comment l'énergie mécanique se transforme en mesure précise du temps."
    />

    <div class="fonctionnement-layout">
      <div class="fonctionnement-content">
        <section id="anatomie" class="row row--anatomie">
          <div class="row__text">
            <p class="intro">{{ introduction.intro }}</p>
            <p class="intro">{{ introduction.exemple }}</p>
            <p class="intro">{{ introduction.conclusion }}</p>
          </div>
          <div class="row__visual card-watch-parts">
            <h2>Les parties de la montre</h2>
            <p class="intro-card">
              Cliquez sur chaque pièce pour en savoir plus
            </p>
            <WatchExplode :parts="watchParts" />
          </div>
        </section>

        <section id="chiffres" class="chiffres-cles-section">
          <p class="fonctionnement-details__tag">Chiffres clés</p>
          <h2>Un mouvement '6497' en quelques données</h2>
          <ChiffresCles :chiffres="chiffresCles" />
        </section>

        <section class="row row--mecanisme">
          <div id="mecanisme" class="row__visual fonctionnement-details">
            <p class="fonctionnement-details__tag">Du ressort à l'aiguille</p>
            <h2>Le mécanisme en mouvement</h2>
            <p class="intro-card">
              Cliquez sur un point ou une légende pour explorer chaque
              composant.
            </p>
            <MovementFlow :fonctionnements="movementFlow" />
          </div>
          <div id="lexique" class="row__text lexique-section">
            <p class="fonctionnement-details__tag">Lexique</p>
            <h2>Le vocabulaire de l'horloger</h2>
            <FonctionnementLexique :termes="lexique" />
          </div>
        </section>

        <ReadNext :items="readNextItems" />
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
h2 {
  color: #ad856f;
}
</style>
