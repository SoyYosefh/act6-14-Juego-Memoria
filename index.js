const board = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
let cards = [];
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

// Números para las tarjetas
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const doubleNumbers = [...numbers, ...numbers];

// Mezclar las tarjetas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(doubleNumbers);
    doubleNumbers.forEach(number => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.number = number;
        card.textContent = number;
        card.classList.add('hidden');
        card.addEventListener('click', flipCard);
        board.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.style.color = 'white';

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.number === secondCard.dataset.number) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.style.color = 'transparent';
        secondCard.style.color = 'transparent';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    board.innerHTML = '';
    cards = [];
    createBoard();
}

resetButton.addEventListener('click', resetGame);

// Inicializa el juego
createBoard();
