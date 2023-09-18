let quizData = [];
let currentQuestionIndex = 0;

function startQuiz(quizType) {
    fetch('http://localhost:3000/home') // Fetching from local server
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

            // Hide the initial quiz selection buttons
            document.getElementById("start-buttons").style.display = "none";
            
            // Show the first question
            displayQuestion(currentQuestionIndex);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error.message);
        });
}

function displayQuestion(index) {
    let question = quizData[index];
    let optionsDiv = document.getElementById("options");
    
    document.getElementById("question-text").innerText = question.question;
    optionsDiv.innerHTML = ""; // Clear previous options

    question.options.forEach((option, idx) => {
        let optionBtn = document.createElement("button");
        optionBtn.innerText = option;
        optionBtn.addEventListener("click", () => {
            if (option === question.answer) {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizData.length) {
                    displayQuestion(currentQuestionIndex);
                } else {
                    alert("Quiz finished!");
                    document.getElementById("start-buttons").style.display = "block";
                    document.getElementById("quiz-section").style.display = "none";
                    currentQuestionIndex = 0;
                }
            } else {
                alert("Wrong answer! Try again.");
            }
        });
        optionsDiv.appendChild(optionBtn);
    });

    document.getElementById("quiz-section").style.display = "block";
}

document.getElementById('vikings-btn').addEventListener('click', () => startQuiz('vikings'));
document.getElementById('tudors-btn').addEventListener('click', () => startQuiz('tudors'));
