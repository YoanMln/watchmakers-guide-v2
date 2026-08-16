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
</script>

<template>
  <div class="quiz-page page-centered">
    <div class="quiz-page__header-container">
      <!-- Sélection difficulté -->
      <div v-if="!selectedDifficulty">
        <h1 class="quiz-page__title">Testez vos connaissances</h1>
        <h2 class="quiz-page__sub-text">
          Choisissez votre niveau de maîtrise :
        </h2>
        <div>
          <QuizDifficultyCard @select="chooseDifficulty" />
        </div>
      </div>

      <!-- Quiz en cours -->
      <div v-else-if="currentQuestion">
        <QuizQuestionCard
          :question="currentQuestion"
          :question-number="currentQuestionIndex + 1"
          :total-questions="filteredQuestions.length"
          :difficulty="selectedDifficulty"
          :score="score"
          :show-feedback="showFeedback"
          @answer="selectAnswer"
        />

        <!-- Popup-alert -->
        <div v-if="showFeedback" class="container-alert">
          <div class="container-alert__custom-alert">
            <p v-if="lastAnswerCorrect">Bonne réponse !</p>

            <p v-else>
              Mauvaise réponse <br /><br />
              La bonne réponse était :
              <span>
                {{ currentQuestion.answers[currentQuestion.correctAnswer] }}
              </span>
            </p>
            <button class="container-alert__next" @click="nextQuestion">
              Question suivante
            </button>
          </div>
        </div>
        <ProgressBar
          :current="currentQuestionIndex + 1"
          :total="filteredQuestions.length"
        />
      </div>

      <!-- End-zone -->
      <div v-else class="end-zone-quiz">
        <h2 class="end-zone-quiz__title">Quiz terminé !</h2>
        <p class="end-zone-quiz__results">
          Score final : {{ score }} / {{ filteredQuestions.length }}
        </p>
        <p class="end-zone-quiz__description">
          Félicitations ! Vous avez terminé le parcours. Continuez à explorer
          Watchmaker's Guide ou relevez le défi avec un autre niveau.
        </p>
        <button class="btn-cta end-zone-quiz__retry" @click="restartQuiz">
          Changer de difficulté
        </button>
      </div>
    </div>
  </div>
</template>
