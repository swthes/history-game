// Define initial variables
let quizData = [];
let currentQuestionIndex = 0;
let quizTypeSelected = null;
// Fetch the number of lives from localStorage or set it to 3 as default
let lives = localStorage.getItem('lives') ? parseInt(localStorage.getItem('lives'), 10) : 3;

// Function to start the quiz based on the selected quiz type
function startQuiz(quizType) {
    // Fetch quiz data from the server
    fetch('http://localhost:3000/home')
        .then(response => {
            // Check if the response is not okay and throw an error if so
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Set quiz data based on quiz type selected
            if (quizType === 'vikings') {
                quizData = data.VikingQuestions;
            } else if (quizType === 'tudors') {
                quizData = data.tudorQuestions;
            }

            quizTypeSelected = quizType;

            // Reset lives if starting a new quiz or if the user had 0 lives previously
            if (!localStorage.getItem('lives') || lives <= 0) {
                lives = 3;
            }

            updateLivesDisplay();
            localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
            localStorage.setItem('quizType', quizTypeSelected);

            // Hide start buttons and start the quiz if user has lives
            document.getElementById("start-buttons").style.display = "none";

            if (lives > 0) {
                displayQuestion(currentQuestionIndex);
            } else {
                // Display modal when user is out of lives
                displayOutOfLivesModal();
            }
        })
        .catch(error => {
            // Log any errors with fetching the data
            console.error('There was a problem with the fetch operation:', error.message);
        });
}

// Function to display the question on the screen
function displayQuestion(index) {
    if (lives <= 0) {
        // If user is out of lives, show the modal
        return displayOutOfLivesModal();
    }

    let question = quizData[index];
    let optionsDiv = document.getElementById("options");

    document.getElementById("question-text").innerText = question.question;
    optionsDiv.innerHTML = "";

    // Display the question options and bind click events
    question.options.forEach((option) => {
        let optionBtn = document.createElement("button");
        optionBtn.innerText = option;
        optionBtn.addEventListener("click", () => {
            // Check if the selected answer is correct
            if (option === question.answer) {
                currentQuestionIndex++;
                // Continue the quiz if there are more questions or finish it
                if (currentQuestionIndex < quizData.length) {
                    displayQuestion(currentQuestionIndex);
                } else {
                    finishQuiz();
                }
            } else {
                // Decrease lives on wrong answer and update lives display
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

// Function to display the modal when user is out of lives
function displayOutOfLivesModal() {
    document.getElementById("out-of-lives-modal").style.display = "block";
    document.getElementById("quiz-section").style.display = "none";
}

// Function to update the lives display
function updateLivesDisplay() {
    document.getElementById("lives").innerText = `Lives: ${lives}`;
    // Store updated lives in localStorage
    localStorage.setItem('lives', lives);
}

// Function to be called when quiz is finished
function finishQuiz() {
    alert("Quiz finished!");
    // Clear all progress-related data
    clearProgress();
    document.getElementById("start-buttons").style.display = "block";
    document.getElementById("quiz-section").style.display = "none";
    currentQuestionIndex = 0;
    lives = 3;
    updateLivesDisplay();
}

// Function to clear all progress from localStorage
function clearProgress() {
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('quizType');
    localStorage.removeItem('lives');
}

// Attach event listeners to start buttons for each quiz type
document.getElementById('vikings-btn').addEventListener('click', () => startQuiz('vikings'));
document.getElementById('tudors-btn').addEventListener('click', () => startQuiz('tudors'));

// Attach event listener to return to home page
document.getElementById('back-to-home').addEventListener('click', () => {
    clearProgress();
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("start-buttons").style.display = "block";
    currentQuestionIndex = 0;
    lives = 3;
    updateLivesDisplay();
});

// Attach event listener to retry the quiz
document.getElementById("retry-quiz").addEventListener("click", () => {
    document.getElementById("out-of-lives-modal").style.display = "none";
    clearProgress();
    startQuiz(quizTypeSelected);
    currentQuestionIndex = 0;
    lives = 3;
    updateLivesDisplay();
});

// Attach event listener to return to home from modal
document.getElementById("modal-home").addEventListener("click", () => {
    document.getElementById("out-of-lives-modal").style.display = "none";
    clearProgress();
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("start-buttons").style.display = "block";
    currentQuestionIndex = 0;
    lives = 3;
    updateLivesDisplay();
});

// On page load, check if there's an ongoing quiz and continue from where user left off
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('currentQuestionIndex') && localStorage.getItem('quizType')) {
        currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex'), 10);
        startQuiz(localStorage.getItem('quizType'));
    }
});
