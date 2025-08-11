// A palavra que o jogador precisa adivinhar
const palavraSecreta = "JAVASCRIPT"; 
let letrasAdivinhadas = [];

// Selecionar elementos do HTML
const wordDisplay = document.getElementById("word-display");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const message = document.getElementById("message");

// Função para mostrar a palavra com os espaços
function displayWord() {
    let display = "";
    for (const letra of palavraSecreta) {
        if (letrasAdivinhadas.includes(letra)) {
            display += letra + " ";
        } else {
            display += "_ ";
        }
    }
    wordDisplay.textContent = display;
}

// Inicia o jogo
displayWord();

guessButton.addEventListener("click", handleGuess);

function handleGuess() {
    const guess = guessInput.value.toUpperCase();
    guessInput.value = ""; // Limpa o campo de input

    // Valida se é uma única letra
    if (guess.length !== 1 || !/^[A-Z]$/.test(guess)) {
        message.textContent = "Por favor, digite uma única letra válida.";
        return;
    }

    // Verifica se a letra já foi adivinhada
    if (letrasAdivinhadas.includes(guess)) {
        message.textContent = "Você já tentou essa letra. Tente outra.";
        return;
    }

    letrasAdivinhadas.push(guess);

    if (palavraSecreta.includes(guess)) {
        message.textContent = `A letra "${guess}" está na palavra!`;
    } else {
        message.textContent = `A letra "${guess}" não está na palavra.`;
    }

    displayWord();
    checkForWin(); // Chamada para a nova função
}

function checkForWin() {
    let palavraCompleta = true;
    for (const letra of palavraSecreta) {
        if (!letrasAdivinhadas.includes(letra)) {
            palavraCompleta = false;
            break;
        }
    }

    if (palavraCompleta) {
        message.textContent = "Parabéns! Você venceu!";
        guessButton.disabled = true; // Desabilita o botão para não continuar o jogo
        guessInput.disabled = true; // Desabilita o campo de input
    }
}
