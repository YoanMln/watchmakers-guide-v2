<script setup>
useSeoMeta({
  title: "Fonctionnement d'un mouvement mécanique | Watchmakers Guide",
  description:
    "Découvrez le fonctionnement d’une montre mécanique : du barillet au balancier, en passant par les rouages et l’échappement, tout est expliqué simplement et clairement.",
});
import fonctionnementdata from "~/data/fonctionnement/fonctionnement-data.json";
const etapes = fonctionnementdata.etapes;
</script>

<template>
  <article class="fonctionnement">
    <div class="container-title">
      <h1 class="title-mecanique">Le mouvement mécanique simple</h1>
      <h2 class="intro">
        Le mouvement mécanique utilise un ressort de barillet que l’on remonte
        manuellement. Ce ressort emmagasine de l’énergie, qui est transmise à
        des rouages. La régulation est assurée par le balancier qui contrôle
        cette énergie pour la libérer à un rythme régulier, ce qui permet aux
        aiguilles d’avancer de façon précise.
      </h2>
    </div>

    <div class="card-watch-parts">
      <h2>Les parties de la montre</h2>
      <p class="intro-card">Elle se compose en 3 parties essentielles</p>
      <div class="details">
        <ul class="details-list">
          <li>
            1. Le mouvement
            <p>
              Partie mécanique comprenant l’ensemble des organes et des
              mécanisme qui servent à indiquer l’heure.
            </p>
          </li>
          <li>
            2. Le cadran et les aiguilles
            <p>Qui sont les organes indicateurs</p>
          </li>
          <li>
            3. La boîte
            <p>
              Composée de la carrure, la glace et le fond. C’est l’organe
              protecteur du mouvement.
            </p>
          </li>
        </ul>
        <div class="schema-parts">
          <img
            class="watch-parts"
            src="/images/fonctionnement/watch-parts.webp"
            alt="schéma des différentes parties d'une montre"
          />
        </div>
      </div>
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
          />
        </div>
      </div>
    </div>
  </article>
</template>
