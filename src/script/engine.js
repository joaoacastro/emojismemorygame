let currentDifficulty = "";
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

let currentAudio;

function playSound(audioName) {
  if (currentAudio) {
    currentAudio.pause(); // Pausa o áudio atual, se estiver tocando
  }

  currentAudio = new Audio(`./src/sounds/${audioName}.mp3`);
  currentAudio.volume = 0.08;
  currentAudio.play();
}

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause(); // Pausa o áudio que está tocando
  }
}

function goodResult() {
  let audio = new Audio("./src/sounds/goodResult.mp3");
  audio.volume = 0.5;
  audio.play();
}

document.addEventListener("DOMContentLoaded", function () {
  // Verificar se há uma dificuldade armazenada no local storage
  const difficulty = localStorage.getItem("difficulty");
  if (difficulty) {
    currentDifficulty = difficulty; // Define a dificuldade atual
    loadScript(`src/script/engine${difficulty}.js`);

    const gameScreen = document.getElementById("gameScreen");
    const easyDifficultyButtons = document.getElementById("easyButton");
    const normalDifficultyButtons = document.getElementById("normalButton");
    const hardDifficultyButtons = document.getElementById("hardButton");

    const screenTimer = document.getElementById("containerTimer");
    // const screenTimer = document.querySelector("#showContainerTimer");

    gameScreen.classList.remove("easyGame", "normalGame", "hardGame");

    screenTimer.classList.replace("containerTimer", "showContainerTimer");

    if (difficulty === "Easy") {
      playSound("easy");
      gameScreen.classList.add("easyGame");
      easyDifficultyButtons.classList.add("btnActive");
    } else if (difficulty === "Normal") {
      playSound("normal");
      gameScreen.classList.add("normalGame");
      normalDifficultyButtons.classList.add("btnActive");
    } else if (difficulty === "Hard") {
      playSound("hard");
      gameScreen.classList.add("hardGame");
      hardDifficultyButtons.classList.add("btnActive");
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
  currentDifficulty = "Easy";
  resetPage("Easy");
});
document.getElementById("normalButton").addEventListener("click", function () {
  currentDifficulty = "Normal";
  resetPage("Normal");
});
document.getElementById("hardButton").addEventListener("click", function () {
  currentDifficulty = "Hard";
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

  const textAlert = document.getElementById("textCustomAlert");

  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    stopAudio();

    clearInterval(timer);
    const finalTime = timerElement.textContent;
    customAlert.classList.remove("hidden");

    setTimeout(() => {
      goodResult();
      textAlert.innerHTML = `CONGRATS!! <br> You finished the ${currentDifficulty} game at time: ${finalTime}`;
    }, 500);
  }
}
