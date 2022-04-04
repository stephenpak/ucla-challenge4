var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');
//empty variables//
var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [
  {
    question: 'What does VAR represent?',
    choice1: 'variations',
    choice2: 'The last line of code that was entered.',
    choice3: 'Variable',
    choice4: 'none',
    answer: 3,
  },
  {
    question: 'An object is noted by what character?',
    choice1: '||',
    choice2: '{ }',
    choice3: '<>',
    choice4: 'nothing',
    answer: 2,
  },
  {
    question: 'An ARRAY is noted by what character?',
    choice1: '[ ]',
    choice2: '===',
    choice3: '{ }',
    choice4: '--',
    answer: 1,
  },
  {
    question: 'An INDEX starts with which value?',
    choice1: 'A',
    choice2: '-10',
    choice3: '1',
    choice4: '0',
    answer: 4,
  },
];

var SCORE_POINTS = 100;
var MAX_QUESTIONS = 4;

var startGame = function () {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...availableQuestions];
  getNewQuestion();
};

var getNewQuestion = function () {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('/end.html');
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  var questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    var number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers - true;
};

choices.forEach((choices) => {
  choices.addEventListener('click', (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset['number'];

    var classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
