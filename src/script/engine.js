function setDifficulty(difficulty) {
  const difficultyPrint = document.getElementById("difficultyPrint");

  difficultyPrint.classList.remove("easy", "normal", "hard");

  difficultyPrint.classList.add(difficulty);

  let displayText = "";

  if (difficulty === "easy") {
    displayText = "easy 😎";
  } else if (difficulty === "normal") {
    displayText = "Normal";
  } else if (difficulty === "hard") {
    displayText = "HARD! 🤬";
  }

  difficultyPrint.innerHTML = displayText;

  // difficultyPrint.innerHTML = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

let timer;
let seconds = 0;
const timerElement = document.getElementById("timer");

function loadScript(src) {
  // Criar e carregar o novo script
  const script = document.createElement("script");
  script.id = "difficultyScript";
  script.src = src;
  document.body.appendChild(script);
}

function resetPage(difficulty) {
  localStorage.setItem("difficulty", difficulty); // Armazenar a dificuldade no local storage
  window.location.reload(); // Recarregar a página
}

document.addEventListener("DOMContentLoaded", function () {
  // Verificar se há uma dificuldade armazenada no local storage
  const difficulty = localStorage.getItem("difficulty");
  if (difficulty) {
    loadScript(`src/script/engine${difficulty}.js`);

    const gameScreen = document.getElementById("gameScreen");
    const easyDifficultyButtons = document.getElementById("easyButton");
    const normalDifficultyButtons = document.getElementById("normalButton");
    const hardDifficultyButtons = document.getElementById("hardButton");

    gameScreen.classList.remove("easyGame", "normalGame", "hardGame");

    if (difficulty === "Easy") {
      gameScreen.classList.add("easyGame");
      easyDifficultyButtons.classList.add("btnActive");
      setDifficulty("easy");
    } else if (difficulty === "Normal") {
      gameScreen.classList.add("normalGame");
      normalDifficultyButtons.classList.add("btnActive");
      setDifficulty("normal");
    } else if (difficulty === "Hard") {
      gameScreen.classList.add("hardGame");
      hardDifficultyButtons.classList.add("btnActive");
      setDifficulty("hard");
    }

    startTimer();
    localStorage.removeItem("difficulty"); // Limpar o local storage após carregar o script
  }
});

function startTimer() {
  resetTimer(); // Garantir que o timer comece do zero
  timer = setInterval(updateTimer, 1000); // Corrigir o nome da função
}

function updateTimer() {
  seconds++;
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  // Formatar como "1m09s"
  timerElement.textContent = `${minutes}m${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}s`;
}

function resetTimer() {
  clearInterval(timer); // Para o timer
  seconds = 0; // Reseta os segundos
  timerElement.textContent = "0m00s"; // Reseta o display do timer
}

// Event listeners para os botões
document.getElementById("easyButton").addEventListener("click", function () {
  resetPage("Easy");
});
document.getElementById("normalButton").addEventListener("click", function () {
  resetPage("Normal");
});
document.getElementById("hardButton").addEventListener("click", function () {
  resetPage("Hard");
  document.getElementById("game").classList.add("hardGame");
});

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }

  openCards = [];

  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    clearInterval(timer);
    const finalTime = timerElement.textContent;
    alert(`CONGRATS!! You finish the game at time: ${finalTime}`);
  }
}
