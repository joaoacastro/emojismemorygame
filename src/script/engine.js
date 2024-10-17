function setDifficulty(difficulty){
  const difficultyPrint = document.getElementById("difficultyPrint")

  difficultyPrint.classList.remove("easy","normal","hard");

  difficultyPrint.classList.add(difficulty);

  let displayText = "";

  if (difficulty === "easy"){
    displayText = "easy 😎";
  } else if (difficulty === "normal"){
    displayText = "Normal";
  } else if (difficulty === "hard"){
    displayText = "HARD! 🤬";
  }

  difficultyPrint.innerHTML = displayText;

  // difficultyPrint.innerHTML = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

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

    gameScreen.classList.remove("easyGame","normalGame","hardGame");

    if(difficulty ==="Easy"){
        gameScreen.classList.add("easyGame");
        easyDifficultyButtons.classList.add("btnActive");
        setDifficulty("easy")
      } else if (difficulty === "Normal"){
        gameScreen.classList.add("normalGame");
        normalDifficultyButtons.classList.add("btnActive");
        setDifficulty("normal")
      } else if (difficulty === "Hard"){
        gameScreen.classList.add("hardGame");
        hardDifficultyButtons.classList.add("btnActive");
        setDifficulty("hard")
    }

    localStorage.removeItem("difficulty"); // Limpar o local storage após carregar o script
  }
});


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
