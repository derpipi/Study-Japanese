// =====================
// Flashcards
// =====================

const cards = [
  { jp: "こんにちは", pt: "Olá" },
  { jp: "ありがとう", pt: "Obrigado" },
  { jp: "すみません", pt: "Desculpa / Com licença" },
  { jp: "さようなら", pt: "Adeus" }
];

let cardIndex = 0;

const jpWord = document.getElementById("jp-word");
const ptWord = document.getElementById("pt-word");
const nextCardBtn = document.getElementById("next-card");

function updateCard() {
  const card = cards[cardIndex];
  jpWord.textContent = card.jp;
  ptWord.textContent = card.pt;
}

nextCardBtn.addEventListener("click", () => {
  cardIndex = (cardIndex + 1) % cards.length;
  updateCard();
});

// =====================
// Quiz
// =====================

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

let qIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const q = quiz[qIndex];

  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;

    btn.addEventListener("click", () => {
      if (option === q.answer) {
        score++;
        feedbackEl.textContent = "Correto ✓";
      } else {
        feedbackEl.textContent = "Errado ✗";
      }

      scoreEl.textContent = score;

      qIndex = (qIndex + 1) % quiz.length;

      setTimeout(loadQuestion, 700);
    });

    optionsEl.appendChild(btn);
  });
}

loadQuestion();
updateCard();