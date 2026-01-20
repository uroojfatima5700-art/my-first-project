const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const matchesDisplay = document.getElementById('matches');
const timeDisplay = document.getElementById('time');
const resetBtn = document.getElementById('reset-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const winMessage = document.getElementById('win-message');
const finalMoves = document.getElementById('final-moves');
const finalTime = document.getElementById('final-time');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer;
let seconds = 0;

// Parrot images for the game (8 pairs)
const parrotImages = [
    'https://via.placeholder.com/100/ff6b6b?text=🦜', 'https://via.placeholder.com/100/ff6b6b?text=🦜',
    'https://via.placeholder.com/100/4ecdc4?text=🦜', 'https://via.placeholder.com/100/4ecdc4?text=🦜',
    'https://via.placeholder.com/100/45b7d1?text=🦜', 'https://via.placeholder.com/100/45b7d1?text=🦜',
    'https://via.placeholder.com/100/f9ca24?text=🦜', 'https://via.placeholder.com/100/f9ca24?text=🦜',
    'https://via.placeholder.com/100/f0932b?text=🦜', 'https://via.placeholder.com/100/f0932b?text=🦜',
    'https://via.placeholder.com/100/eb4d4b?text=🦜', 'https://via.placeholder.com/100/eb4d4b?text=🦜',
    'https://via.placeholder.com/100/6c5ce7?text=🦜', 'https://via.placeholder.com/100/6c5ce7?text=🦜',
    'https://via.placeholder.com/100/a29bfe?text=🦜', 'https://via.placeholder.com/100/a29bfe?text=🦜'
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    movesDisplay.textContent = moves;
    matchesDisplay.textContent = matchedPairs;
    timeDisplay.textContent = '00:00';
    winMessage.style.display = 'none';

    shuffle(parrotImages);

    parrotImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.image = image;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });

    startTimer();
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        this.innerHTML = `<img src="${this.dataset.image}" alt="Parrot">`;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        matchesDisplay.textContent = matchedPairs;
        flippedCards = [];

        if (matchedPairs === 8) {
            clearInterval(timer);
            finalMoves.textContent = moves;
            finalTime.textContent = formatTime(seconds);
            winMessage.style.display = 'block';
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '';
            card2.innerHTML = '';
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        seconds++;
        timeDisplay.textContent = formatTime(seconds);
    }, 1000);
}

function formatTime(sec) {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

resetBtn.addEventListener('click', createBoard);
playAgainBtn.addEventListener('click', createBoard);

// Initialize the game
createBoard();