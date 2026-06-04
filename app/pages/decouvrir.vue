<template>
  <div class="discovery-page">
    <div class="header-container-discovery">
      <div class="discovery-intro">
        <h1>Découvrir l’univers de l’horlogerie</h1>
        <p>
          Explorez son histoire, testez vos connaissances et plongez dans ses
          plus grands secrets.
        </p>
      </div>

      <div class="container-gate">
        <div class="gate educational-gate">
          <h2>Histoire de la mesure du temps</h2>
          <p class="gate-description">
            Découvrez l'évolution de la mesure du temps à travers les âges...
          </p>
          <div class="gate-action">
            <NuxtLink class="gate-btn" to="/mesure-du-temps"
              >Commencer le voyage</NuxtLink
            >
          </div>
        </div>
        <div class="gate complication-gate">
          <h2>Les complications</h2>
          <p class="gate-description">
            Explorez les mécanismes les plus complexes
          </p>
          <div class="gate-action">
            <NuxtLink class="gate-btn" to="/complications">Explorez</NuxtLink>
          </div>
        </div>
        <div class="gate quiz-gate">
          <h2>Quiz interactif</h2>
          <p class="gate-description">
            Testez vos connaissances avec un quiz au niveau adaptatif
          </p>
          <div class="gate-action">
            <NuxtLink class="gate-btn" to="/quiz">Démarrer</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
