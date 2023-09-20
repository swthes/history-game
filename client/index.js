// module.import { Questions  }  = './class.js';
class Quiz {
   /* * *Initialize Quiz Variables**:
 *     - Set the initial score to zero.
 *     - Start with the first question in the questions array.
 *     - Reset any timers or counters that are in place.*/
    constructor() {
        this.quizData = [];
        this.currentQuestionIndex = 0;
        this.quizTypeSelected = null;
        this.lives = localStorage.getItem('lives') ? parseInt(localStorage.getItem('lives'), 10) : 3;
        
        this.attachEventListeners();
    }
 
    startQuiz(quizType) {
       
        
       

        this.quizTypeSelected = quizType;

        if (!localStorage.getItem('lives') || this.lives <= 0) {
            this.lives = 3;
        }

        this.updateLivesDisplay();
        localStorage.setItem('currentQuestionIndex', this.currentQuestionIndex);
        localStorage.setItem('quizType', this.quizTypeSelected);

        document.getElementById("start-buttons").style.display = "none";
        
        document.getElementById("instructions").style.display = "none";

        if (this.lives > 0) {
            this.displayQuestion(this.currentQuestionIndex);
        } else {
            this.displayOutOfLivesModal();
        }
        

        
      
    }

    displayQuestion(index) {
        if (this.lives <= 0) {
            return this.displayOutOfLivesModal();
        }
    
        let question = this.quizData[index];
        let optionsDiv = document.getElementById("options");
    
        document.getElementById("question-text").innerText = question.question;
        optionsDiv.innerHTML = "";
    
        question.options.forEach((option) => {
            let optionBtn = document.createElement("button");
            optionBtn.innerText = option;
            optionBtn.addEventListener("click", () => {
                console.log(option);
                if (option === question.answer) {
                   
                    this.currentQuestionIndex++;
                    if (this.currentQuestionIndex < this.quizData.length) {
                        this.displayQuestion(this.currentQuestionIndex);
                    } else {
                        this.finishQuiz();
                    }
                } else {
                    this.lives--;
                    this.updateLivesDisplay();
                    this.displayLifeMessages();
                
                }
            });
            optionsDiv.appendChild(optionBtn);
        });
        document.getElementById("instructions").style.display = "none";
        document.getElementById("quiz-section").style.display = "block";
    }

    displayOutOfLivesModal() {
        
        document.getElementById("out-of-lives-modal").style.display = "block";
        document.getElementById("instructions").style.display = "none";
        document.getElementById("quiz-section").style.display = "none";
        
    }
    displayLifeMessages(){
        if(this.quizTypeSelected == "tudors"){
        if (this.lives <= 0) {
            this.displayOutOfLivesModal();
        } else if(this.lives == 2) {
            alert("But two opportunities remain unto me");
        }else{
           alert("Pray, ponder upon the query, but one life remaineth unto thee")
        }}
        else if(this.quizTypeSelected == "vikings"){
            if (this.lives <= 0) {
                this.displayOutOfLivesModal();
            } else if(this.lives == 2) {
                alert("Twegen cyrses me yet standaþ/only got two more chances left");
            }else{
               alert("Bid, smea on þa frignung, ac an lif þe yet standeþ/ time a to think about the question only got 1 life left")
            }
        }
    }
    updateLivesDisplay() {
        document.getElementById("lives").innerText = `Lives: ${this.lives}`;
        localStorage.setItem('lives', this.lives);
    }

    finishQuiz() {
        alert("Quiz finished!");

        // Clear all progress-related data
        this.clearProgress();
    
        document.getElementById("start-buttons").style.display = "block";
        document.getElementById("quiz-section").style.display = "none";
    
        this.currentQuestionIndex = 0;
        this.lives = 3;
        this.updateLivesDisplay();
    }

    clearProgress() {
        localStorage.removeItem('currentQuestionIndex');
        localStorage.removeItem('quizType');
        localStorage.removeItem('lives');
    }

    displayinstructions(name){
        document.getElementById('start-button').addEventListener('click', () => this.startQuiz(name));
       
        document.getElementById("start-buttons").style.display = "none";
        document.getElementById("instructions").style.display = "block";
       
        document.getElementById('character-select').style.display = 'none';
    }
    attachEventListeners() {
        document.getElementById('vikings-btn').addEventListener('click', () => this.getData('vikings'));
        document.getElementById('tudors-btn').addEventListener('click', () => this.getData('tudors'));
        document.getElementById('back-to-home').addEventListener('click', this.backToHome.bind(this));
        document.getElementById("retry-quiz").addEventListener("click", this.retryQuiz.bind(this));
        document.getElementById("modal-home").addEventListener("click", this.modalHome.bind(this));
        document.getElementById('back-home').addEventListener('click', this.backToHome.bind(this));
        document.getElementById("instructions").style.display = "none";
        // character event listener
        document.getElementById('france1').addEventListener('click', () => this.displayinstructions('Napoleon'))
        window.addEventListener("DOMContentLoaded", this.loadQuiz.bind(this));
    }

    backToHome() {
        this.clearProgress();
        document.getElementById("quiz-section").style.display = "none";
        document.getElementById("instructions").style.display = "none";
        document.getElementById("start-buttons").style.display = "block";
        this.currentQuestionIndex = 0;
        this.lives = 3;
        this.updateLivesDisplay();
    }

    retryQuiz() {
        document.getElementById("out-of-lives-modal").style.display = "none";
        this.clearProgress();
        this.startQuiz(this.quizTypeSelected);
        this.currentQuestionIndex = 0;
        this.lives = 3;
        this.updateLivesDisplay();
    }

    modalHome() {
        document.getElementById("out-of-lives-modal").style.display = "none";
        this.backToHome();
    }

    loadQuiz() {
        if (localStorage.getItem('currentQuestionIndex') && localStorage.getItem('quizType')) {
            this.currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex'), 10);
            this.startQuiz(localStorage.getItem('quizType'));
        }
    }
    // gets the questions for the time period
    getData(type){
          fetch('http://localhost:3000/home')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
        .then(data => {
            if (type =='vikings') {
                this.quizData = data.VikingQuestions;
            } else if (type == 'tudors') {
                this.quizData = data.tudorQuestions;
                
            } else if(type == 'france'){
                this.quizData = data.FranceQuestions;
            }else if (type == 'roman'){
                // this.quizData =
            }
            this.characterload(type)
            }
            )
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error.message);
            });
    }
// loads character based on the type
   characterload(type){
    console.log('hello');
    document.getElementById('start-buttons').style.display = 'none';
        if(type == 'vikings'){
            
        }else if (type == 'roman') {
            
        }else if(type == 'tudors'){
         document.getElementById('character-select').style.display = 'block';
         document.getElementById('character-france').style.display= 'block';
        }else if(type == 'france'){
        
        }
 }
 getcharacterQuestions(name){
    const question = this.quizData
   switch(name){
    case 'Napoleon':
        //  question.NapoleonQuestions.forEach((Element)=>  
         
        //  )
        break;
   }
 }
}

const quizGame = new Quiz();


// home -> Character -> intructions-> quiz




// // Function to start the quiz based on the selected quiz type
// function startQuiz(quizType) {
//     // Fetch quiz data from the server
//     fetch('http://localhost:3000/home')
//         .then(response => {
//             // Check if the response is not okay and throw an error if so
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             // Set quiz data based on quiz type selected
//             if (quizType === 'vikings') {
//                 quizData = data.VikingQuestions;
//             } else if (quizType === 'tudors') {
//                 quizData = data.tudorQuestions;
//             }

//             quizTypeSelected = quizType;

//             // Reset lives if starting a new quiz or if the user had 0 lives previously
//             if (!localStorage.getItem('lives') || lives <= 0) {
//                 lives = 3;
//             }

//             updateLivesDisplay();
//             localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
//             localStorage.setItem('quizType', quizTypeSelected);

//             // Hide start buttons and start the quiz if user has lives
//             document.getElementById("start-buttons").style.display = "none";

//             if (lives > 0) {
//                 displayQuestion(currentQuestionIndex);
//             } else {
//                 // Display modal when user is out of lives
//                 displayOutOfLivesModal();
//             }
//         })
//         .catch(error => {
//             // Log any errors with fetching the data
//             console.error('There was a problem with the fetch operation:', error.message);
//         });
// }

// // Function to display the question on the screen
// function displayQuestion(index) {
//     if (lives <= 0) {
//         // If user is out of lives, show the modal
//         return displayOutOfLivesModal();
//     }

//     let question = quizData[index];
//     let optionsDiv = document.getElementById("options");

//     document.getElementById("question-text").innerText = question.question;
//     optionsDiv.innerHTML = "";

//     // Display the question options and bind click events
//     question.options.forEach((option) => {
//         let optionBtn = document.createElement("button");
//         optionBtn.innerText = option;
//         optionBtn.addEventListener("click", () => {
//             // Check if the selected answer is correct
//             if (option === question.answer) {
//                 currentQuestionIndex++;
//                 // Continue the quiz if there are more questions or finish it
//                 if (currentQuestionIndex < quizData.length) {
//                     displayQuestion(currentQuestionIndex);
//                 } else {
//                     finishQuiz();
//                 }
//             } else {
//                 // Decrease lives on wrong answer and update lives display
//                 lives--;
//                 updateLivesDisplay();
//                 if (lives <= 0) {
//                     displayOutOfLivesModal();
//                 } else {
//                     alert("Wrong answer! Try again.");
//                 }
//             }
//         });
//         optionsDiv.appendChild(optionBtn);
//     });

//     document.getElementById("quiz-section").style.display = "block";
// }

// // Function to display the modal when user is out of lives
// function displayOutOfLivesModal() {
//     document.getElementById("out-of-lives-modal").style.display = "block";
//     document.getElementById("quiz-section").style.display = "none";
// }

// // Function to update the lives display
// function updateLivesDisplay() {
//     document.getElementById("lives").innerText = `Lives: ${lives}`;
//     // Store updated lives in localStorage
//     localStorage.setItem('lives', lives);
// }

// // Function to be called when quiz is finished
// function finishQuiz() {
//     alert("Quiz finished!");
//     // Clear all progress-related data
//     clearProgress();
//     document.getElementById("start-buttons").style.display = "block";
//     document.getElementById("quiz-section").style.display = "none";
//     currentQuestionIndex = 0;
//     lives = 3;
//     updateLivesDisplay();
// }

// // Function to clear all progress from localStorage
// function clearProgress() {
//     localStorage.removeItem('currentQuestionIndex');
//     localStorage.removeItem('quizType');
//     localStorage.removeItem('lives');
// }

// // Attach event listeners to start buttons for each quiz type
// document.getElementById('vikings-btn').addEventListener('click', () => startQuiz('vikings'));
// document.getElementById('tudors-btn').addEventListener('click', () => startQuiz('tudors'));

// // Attach event listener to return to home page
// document.getElementById('back-to-home').addEventListener('click', () => {
//     clearProgress();
//     document.getElementById("quiz-section").style.display = "none";
//     document.getElementById("start-buttons").style.display = "block";
//     currentQuestionIndex = 0;
//     lives = 3;
//     updateLivesDisplay();
// });

// // Attach event listener to retry the quiz
// document.getElementById("retry-quiz").addEventListener("click", () => {
//     document.getElementById("out-of-lives-modal").style.display = "none";
//     clearProgress();
//     startQuiz(quizTypeSelected);
//     currentQuestionIndex = 0;
//     lives = 3;
//     updateLivesDisplay();
// });

// // Attach event listener to return to home from modal
// document.getElementById("modal-home").addEventListener("click", () => {
//     document.getElementById("out-of-lives-modal").style.display = "none";
//     clearProgress();
//     document.getElementById("quiz-section").style.display = "none";
//     document.getElementById("start-buttons").style.display = "block";
//     currentQuestionIndex = 0;
//     lives = 3;
//     updateLivesDisplay();
// });

// // On page load, check if there's an ongoing quiz and continue from where user left off
// window.addEventListener("DOMContentLoaded", () => {
//     if (localStorage.getItem('currentQuestionIndex') && localStorage.getItem('quizType')) {
//         currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex'), 10);
//         startQuiz(localStorage.getItem('quizType'));
//     }
// });
