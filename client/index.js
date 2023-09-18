let quizData = [];
let currentQuestionIndex = 0;
let quizTypeSelected = null;
let lives = localStorage.getItem('lives') ? parseInt(localStorage.getItem('lives'), 10) : 3; // Get lives from localStorage

function startQuiz(quizType) {
    fetch('http://localhost:3000/home')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (quizType === 'vikings') {
                quizData = data.VikingQuestions;
            } else if (quizType === 'tudors') {
                quizData = data.tudorQuestions;
            }

            quizTypeSelected = quizType;

            // Only reset lives if it's a new quiz or they had 0 lives previously
            if (!localStorage.getItem('lives') || lives <= 0) {
                lives = 3;
            }

            updateLivesDisplay();
            localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
            localStorage.setItem('quizType', quizTypeSelected);

            document.getElementById("start-buttons").style.display = "none";

            if (lives > 0) {
                displayQuestion(currentQuestionIndex);
            } else {
                displayOutOfLivesModal();
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error.message);
        });
}

function displayQuestion(index) {
    if (lives <= 0) {
        return displayOutOfLivesModal();
    }

    let question = quizData[index];
    let optionsDiv = document.getElementById("options");

    document.getElementById("question-text").innerText = question.question;
    optionsDiv.innerHTML = "";

    question.options.forEach((option) => {
        let optionBtn = document.createElement("button");
        optionBtn.innerText = option;
        optionBtn.addEventListener("click", () => {
            if (option === question.answer) {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizData.length) {
                    displayQuestion(currentQuestionIndex);
                } else {
                    finishQuiz();
                }
            } else {
                lives--;
                updateLivesDisplay();
                if (lives <= 0) {
                    displayOutOfLivesModal();
                } else {
                    alert("Wrong answer! Try again.");
                }
            }
        });
        optionsDiv.appendChild(optionBtn);
    });

    document.getElementById("quiz-section").style.display = "block";
}

function displayOutOfLivesModal() {
    document.getElementById("out-of-lives-modal").style.display = "block";
    document.getElementById("quiz-section").style.display = "none";
}

function updateLivesDisplay() {
    document.getElementById("lives").innerText = `Lives: ${lives}`;
    localStorage.setItem('lives', lives);  // Store lives in localStorage
}

function finishQuiz() {
    alert("Quiz finished!");
    clearProgress();
    document.getElementById("start-buttons").style.display = "block";
    document.getElementById("quiz-section").style.display = "none";
    currentQuestionIndex = 0;
    lives = 3;
    updateLivesDisplay();
}

function clearProgress() {
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('quizType');
    localStorage.removeItem('lives');
}

document.getElementById('vikings-btn').addEventListener('click', () => startQuiz('vikings'));
document.getElementById('tudors-btn').addEventListener('click', () => startQuiz('tudors'));

document.getElementById('back-to-home').addEventListener('click', () => {
    clearProgress();
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("start-buttons").style.display = "block";
    currentQuestionIndex = 0;
    lives = 3;
    updateLivesDisplay();
});

document.getElementById("retry-quiz").addEventListener("click", () => {
    document.getElementById("out-of-lives-modal").style.display = "none";
    clearProgress();
    startQuiz(quizTypeSelected);
    currentQuestionIndex = 0;
    lives = 3;
    updateLivesDisplay();
});

document.getElementById("modal-home").addEventListener("click", () => {
    document.getElementById("out-of-lives-modal").style.display = "none";
    clearProgress();
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("start-buttons").style.display = "block";
    currentQuestionIndex = 0;
    lives = 3;
    updateLivesDisplay();
});

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('currentQuestionIndex') && localStorage.getItem('quizType')) {
        currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex'), 10);
        startQuiz(localStorage.getItem('quizType'));
    }
});
