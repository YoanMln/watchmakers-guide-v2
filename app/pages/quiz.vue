<script setup>
import { ref, computed } from "vue";
import dataquiz from "~/data/quiz/data-quiz.json";
import ProgressBar from "~/components/ProgressBar.vue";

const selectedDifficulty = ref(null);
const currentQuestionIndex = ref(0);
const score = ref(0);
const showFeedback = ref(false);
const lastAnswerCorrect = ref(null);

const filteredQuestions = computed(() => {
  if (!selectedDifficulty.value) return [];
  return dataquiz.filter((q) => q.difficulty === selectedDifficulty.value);
});

const currentQuestion = computed(() => {
  return filteredQuestions.value[currentQuestionIndex.value];
});

function chooseDifficulty(level) {
  selectedDifficulty.value = level;
  currentQuestionIndex.value = 0;
  score.value = 0;
  showFeedback.value = false;
}

function selectAnswer(index) {
  const isCorrect = index === currentQuestion.value.correctAnswer;
  lastAnswerCorrect.value = isCorrect;

  if (isCorrect) {
    score.value++;
  }
  showFeedback.value = true;
}

function nextQuestion() {
  showFeedback.value = false;
  currentQuestionIndex.value++;
}

function restartQuiz() {
  selectedDifficulty.value = null;
  currentQuestionIndex.value = 0;
  score.value = 0;
  showFeedback.value = false;
}

// niveau de difficultés //

const difficultyLevels = [
  {
    value: "novice",
    numeral: "I",
    label: "Novice",
    description: "Vocabulaire, pièces visibles et marques emblématiques",
  },
  {
    value: "horloger",
    numeral: "II",
    label: "Horloger",
    description: "Mécanismes internes, réglage et complications classiques",
  },
  {
    value: "maitre horloger",
    numeral: "III",
    label: "Maître-horloger",
    description: "Haute fréquence, tourbillon et régulation avancée",
  },
];
</script>

<template>
  <div class="quiz-page">
    <div class="header-container-quiz">
      <h1 class="title-quiz">Quiz horloger</h1>

      <!-- Sélection difficulté -->
      <div v-if="!selectedDifficulty" class="difficulty-selection">
        <h2 class="sub-text">Choisissez votre niveau de maîtrise :</h2>

        <div class="container-card-difficulty">
          <button
            v-for="level in difficultyLevels"
            :key="level.value"
            class="card-difficulty"
            @click="chooseDifficulty(level.value)"
          >
            <p class="card-difficulty__numeral">{{ level.numeral }}</p>
            <h3 class="card-difficulty__title">{{ level.label }}</h3>
            <p class="card-difficulty__desc">
              {{ level.description }}
            </p>
          </button>
        </div>
      </div>

      <!-- Quiz en cours -->
      <div v-else-if="currentQuestion">
        <div id="quiz-progression">
          Question : {{ currentQuestionIndex + 1 }} /
          {{ filteredQuestions.length }}
          <p class="sub-text">Score : {{ score }}</p>
        </div>

        <p class="quiz-difficulty">
          Difficulté choisie : {{ selectedDifficulty }}
        </p>

        <div class="current-question"></div>
        <h2>{{ currentQuestion.question }}</h2>
        <div id="answers">
          <button
            v-for="(answer, i) in currentQuestion.answers"
            :key="i"
            class="btn-quiz"
            @click="selectAnswer(i)"
            :disabled="showFeedback"
          >
            {{ answer }}
          </button>
        </div>

        <!-- Popup résultat -->
        <div v-if="showFeedback" id="custom-alert">
          <p v-if="lastAnswerCorrect">Bonne réponse !</p>

          <p v-else>
            Mauvaise réponse <br /><br />
            La bonne réponse était :
            <strong>
              {{ currentQuestion.answers[currentQuestion.correctAnswer] }}
            </strong>
          </p>

          <button @click="nextQuestion">Question suivante</button>
        </div>
        <ProgressBar
          :current="currentQuestionIndex + 1"
          :total="filteredQuestions.length"
        />
      </div>

      <!-- Fin du quiz -->
      <div v-else>
        <h2 class="sub-text">Quiz terminé !</h2>

        <p id="results">
          Score final : {{ score }} / {{ filteredQuestions.length }}
        </p>

        <div id="retry">
          <button class="btn-retry" @click="restartQuiz">Recommencer</button>
        </div>
      </div>
    </div>
  </div>
</template>
