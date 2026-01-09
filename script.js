const words = [
  { word: "RESPETO", hint: "Tratar bien a los demás." },
  { word: "HONESTIDAD", hint: "Decir la verdad." },
  { word: "JUSTICIA", hint: "Dar a cada quien lo que merece." },
  { word: "RESPONSABILIDAD", hint: "Cumplir con tus deberes." },
  { word: "SOLIDARIDAD", hint: "Ayudar sin esperar algo a cambio." },
  { word: "EQUIDAD", hint: "Tratar a todos de forma justa." },
  { word: "INTEGRIDAD", hint: "Hacer lo correcto aunque nadie vea." },
  { word: "VALORES", hint: "Principios que guían la conducta." },
  { word: "ETICA", hint: "Estudia lo bueno y lo malo." },
  { word: "MORAL", hint: "Normas de conducta social." }
];

let selectedWord = "";
let guessed = [];
let errors = 0;
const maxErrors = 6;

const wordEl = document.getElementById("word");
const keyboardEl = document.getElementById("keyboard");
const statusEl = document.getElementById("status");
const parts = document.querySelectorAll(".part");

function startGame() {
  const random = words[Math.floor(Math.random() * words.length)];
  selectedWord = random.word;
  guessed = [];
  errors = 0;

  revealLetters(random.word);

  statusEl.innerHTML = "💡 <b>Pista:</b> " + random.hint;
  statusEl.style.color = "#facc15";

  parts.forEach(p => p.style.display = "none");

  createKeyboard();
  updateWord();
}

function revealLetters(word) {
  const unique = [...new Set(word.split(""))];
  const revealCount = word.length >= 8 ? 4 : 2;

  while (guessed.length < revealCount) {
    const letter = unique[Math.floor(Math.random() * unique.length)];
    if (!guessed.includes(letter)) guessed.push(letter);
  }
}

function createKeyboard() {
  keyboardEl.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.disabled = guessed.includes(letter);
    btn.onclick = () => guessLetter(letter, btn);
    keyboardEl.appendChild(btn);
  }
}

function guessLetter(letter, btn) {
  btn.disabled = true;

  if (selectedWord.includes(letter)) {
    guessed.push(letter);
    updateWord();
    checkWin();
  } else {
    parts[errors].style.display = "block";
    errors++;
    if (errors === maxErrors) endGame(false);
  }
}

function updateWord() {
  wordEl.textContent = selectedWord
    .split("")
    .map(l => guessed.includes(l) ? l : "_")
    .join(" ");
}

function checkWin() {
  if (selectedWord.split("").every(l => guessed.includes(l))) {
    endGame(true);
  }
}

function endGame(win) {
  document.querySelectorAll(".keyboard button")
    .forEach(b => b.disabled = true);

  statusEl.innerHTML = win
    ? "🎉 ¡Ganaste! La palabra era: <b>" + selectedWord + "</b>"
    : "💀 Perdiste. La palabra era: <b>" + selectedWord + "</b>";

  statusEl.style.color = win ? "#22c55e" : "#ef4444";
}

startGame();