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

    gameScreen.classList.remove("easyGame","normalGame","hardGame");
    
    if(difficulty ==="Easy"){
        gameScreen.classList.add("easyGame");
    } else if (difficulty === "Normal"){
        gameScreen.classList.add("normalGame");
    } else if (difficulty === "Hard"){
        gameScreen.classList.add("hardGame");
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
