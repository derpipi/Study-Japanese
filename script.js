// =====================
// DATA (conteúdo separado da lógica)
// =====================

const cards = [
  { jp: "こんにちは", pt: "Olá" },
  { jp: "ありがとう", pt: "Obrigado" },
  { jp: "すみません", pt: "Desculpa / Com licença" },
  { jp: "さようなら", pt: "Adeus" }
];

const quiz = [
  {
    question: 'O que significa "ありがとう"?',
    options: ["Obrigado", "Olá", "Adeus", "Desculpa"],
    answer: "Obrigado"
  },
  {
    question: 'O que significa "さようなら"?',
    options: ["Adeus", "Olá", "Sim", "Não"],
    answer: "Adeus"
  }
];

// =====================
// STATE (estado do app)
// =====================

let cardIndex = 0;
let quizIndex = 0;
let score = 0;

// =====================
// ELEMENTOS DOM
// =====================

const jpWord = document.getElementById("jp-word");
const ptWord = document.getElementById("pt-word");
const nextCardBtn = document.getElementById("next-card");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");

// =====================
// FLASHCARDS
// =====================

function renderCard() {
  const { jp, pt } = cards[cardIndex];

  jpWord.textContent = jp;
  ptWord.textContent = pt;
}

function nextCard() {
  cardIndex = (cardIndex + 1) % cards.length;
  renderCard();
}

nextCardBtn.addEventListener("click", nextCard);

// =====================
// QUIZ HELPERS
// =====================

// embaralhar opções (Fisher-Yates)
function shuffle(array) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

// =====================
// QUIZ LOGIC
// =====================

function renderQuestion() {
  const current = quiz[quizIndex];

  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";

  const options = shuffle(current.options);

  options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;

    button.addEventListener("click", () => handleAnswer(option, current.answer));

    optionsEl.appendChild(button);
  });
}

function handleAnswer(selected, correct) {
  if (selected === correct) {
    score++;
    feedbackEl.textContent = "Correto ✓";
  } else {
    feedbackEl.textContent = "Errado ✗";
  }

  scoreEl.textContent = score;

  quizIndex = (quizIndex + 1) % quiz.length;

  setTimeout(renderQuestion, 700);
}

// =====================
// INIT
// =====================

function init() {
  renderCard();
  renderQuestion();
}

init();