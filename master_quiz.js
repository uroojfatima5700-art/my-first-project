const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: "Pacific"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "O2", "NaCl"],
        answer: "H2O"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "Thailand", "South Korea"],
        answer: "Japan"
    },
    {
        question: "What is the square root of 144?",
        options: ["10", "11", "12", "13"],
        answer: "12"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        answer: "Blue Whale"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: "Carbon Dioxide"
    },
    {
        question: "What is the currency of Japan?",
        options: ["Won", "Yen", "Ringgit", "Baht"],
        answer: "Yen"
    },
    {
        question: "Who was the first President of the United States?",
        options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
        answer: "George Washington"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        answer: "Diamond"
    },
    {
        question: "Which continent is the Sahara Desert located in?",
        options: ["Asia", "Africa", "Australia", "South America"],
        answer: "Africa"
    },
    {
        question: "What is the boiling point of water in Celsius?",
        options: ["90", "95", "100", "105"],
        answer: "100"
    },
    {
        question: "Who discovered penicillin?",
        options: ["Alexander Fleming", "Louis Pasteur", "Robert Koch", "Edward Jenner"],
        answer: "Alexander Fleming"
    },
    {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        answer: "Canberra"
    },
    {
        question: "Which element has the atomic number 1?",
        options: ["Helium", "Hydrogen", "Lithium", "Beryllium"],
        answer: "Hydrogen"
    },
    {
        question: "What is the longest river in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        answer: "Nile"
    },
    {
        question: "Who painted 'The Starry Night'?",
        options: ["Claude Monet", "Vincent van Gogh", "Pablo Picasso", "Salvador Dali"],
        answer: "Vincent van Gogh"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;
let totalTime = 0;
let selectedOption = null;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultDiv = document.getElementById('result');
const timeLeftSpan = document.getElementById('time-left');
const scoreSpan = document.getElementById('score');
const questionNumSpan = document.getElementById('question-num');
const totalQuestionsSpan = document.getElementById('total-questions');
const finalScoreSpan = document.getElementById('final-score');
const totalTimeSpan = document.getElementById('total-time');
const restartBtn = document.getElementById('restart-btn');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    totalTime = 0;
    selectedOption = null;
    resultDiv.style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    totalQuestionsSpan.textContent = questions.length;
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }

    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    questionNumSpan.textContent = currentQuestionIndex + 1;
    optionsContainer.innerHTML = '';
    selectedOption = null;
    nextBtn.style.display = 'none';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.dataset.index = index;
        optionDiv.addEventListener('click', selectOption);
        optionsContainer.appendChild(optionDiv);
    });

    timeLeft = 30;
    timeLeftSpan.textContent = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timeLeftSpan.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showAnswer();
        }
    }, 1000);
}

function selectOption() {
    if (selectedOption) return;
    selectedOption = this;
    this.classList.add('selected');
    clearInterval(timer);
    showAnswer();
}

function showAnswer() {
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        if (option.textContent === question.answer) {
            option.classList.add('correct');
        } else if (option === selectedOption) {
            option.classList.add('incorrect');
        }
    });

    if (selectedOption && selectedOption.textContent === question.answer) {
        score++;
        scoreSpan.textContent = score;
    }

    totalTime += (30 - timeLeft);
    nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});

function showResult() {
    document.getElementById('question-container').style.display = 'none';
    nextBtn.style.display = 'none';
    resultDiv.style.display = 'block';
    finalScoreSpan.textContent = `${score} / ${questions.length}`;
    totalTimeSpan.textContent = formatTime(totalTime);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

restartBtn.addEventListener('click', startQuiz);

// Start the quiz
startQuiz();