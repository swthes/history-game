
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
         document.getElementById("start-buttons").style.display = "block";
         console.log('in quiz constructor');
        this.attachEventListeners();
    }
 
    startQuiz(quizType) {
       
        
       console.log('in start quiz');

      

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
   // Function to display the question on the screen
    displayQuestion(index) {
        console.log('in display question');
        if (this.lives <= 0) {
            return this.displayOutOfLivesModal();
        }
        
        let question = this.quizData[index];
        if(question == undefined){
            this.backToHome();
        }
        
        let optionsDiv = document.getElementById("options");
    
        document.getElementById("question-text").innerText = question.getQuestion();
        optionsDiv.innerHTML = "";
        console.log(question.options);
        question.options.forEach((option) => {
            let optionBtn = document.createElement("button");
            optionBtn.innerText = option;
            optionBtn.addEventListener("click", () => {
                console.log(option);
                
                if (question.checkanswer(option)) {
                   
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
    // Function to display the modal when user is out of lives
    displayOutOfLivesModal() {
        console.log('in display out of lives modal');
        document.getElementById("out-of-lives-modal").style.display = "block";
        document.getElementById("instructions").style.display = "none";
        document.getElementById("quiz-section").style.display = "none";
        
    }
    // Function to display the life messages in the alert box from different time periods
    displayLifeMessages(){

        if(this.quizTypeSelected == "tudors"){
            if (this.lives <= 0) {
                this.displayOutOfLivesModal();
            } else if (this.lives == 2) {
                alert("But two opportunities remain unto me. / You only have two chances left.");
            } else {
                alert("Pray, ponder upon the query, but one life remaineth unto thee. / Take some time to think about the question; you only have one life left.");
            }
            }
        else if(this.quizTypeSelected == "vikings"){
            if (this.lives <= 0) {
                this.displayOutOfLivesModal();
            } else if(this.lives == 2) {
                alert("Twegen cyrses me yet standaþ/only got two more chances left");
            }else{
                alert("Bid, smea on þa frignung, ac an lif þe yet standeþ/ time a to think about the question only got 1 life left")
            }
        }else if(this.quizTypeSelected == "france"){
            if (this.lives <= 0) {
                this.displayOutOfLivesModal();
            } else if (this.lives == 2) {
                alert("Vos avez seulement deux chances demourant. / You only have two chances left.");
            } else {
                alert("Prenez temps à penser à la question; vos avez une vie seule demourant. / Take some time to think about the question; you only have one life left.");
            }
            
        } else if(this.quizTypeSelected == "roman"){
            if (this.lives <= 0) {
                this.displayOutOfLivesModal();
            } else if (this.lives == 2) {
                alert("Bis tantum opportunitates reliquae sunt tibi. / You only have two chances left.");
            } else {
                alert("Cogita tempus de quaestione; una tantum vita reliqua est tibi. / Take some time to think about the question; you only have one life left.");
            }            
        }
    }
    // Function to update the lives display
    updateLivesDisplay() {
        document.getElementById("lives").innerText = `Lives: ${this.lives}`;
        localStorage.setItem('lives', this.lives);
    }
    // Function to finish the quiz
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
    // Function to clear all progress from localStorage
    clearProgress() {
        localStorage.removeItem('currentQuestionIndex');
        localStorage.removeItem('quizType');
        localStorage.removeItem('lives');
    }
    // Function to display the instructions
    displayinstructions(name){
        console.log('in display instructions');
        document.getElementById("instructions").style.display = "block";
        document.getElementById("charcter-intro").textContent = this.characterIntroduction(name);
        document.getElementById('start-button').addEventListener('click', () => this.startQuiz(name));
       
        //hhides the start buttons
        document.getElementById("start-buttons").style.display = "none";
        //shows the instructions
        document.getElementById("instructions").style.display = "block";
       
        document.getElementById('character-select').style.display = 'none';
    }
    attachEventListeners() {
        document.getElementById('vikings-btn').addEventListener('click', () => this.getData('vikings'));
        document.getElementById('tudors-btn').addEventListener('click', () => this.getData('tudors'));
        document.getElementById('france-btn').addEventListener('click', () => this.getData('france'));
        document.getElementById('romans-btn').addEventListener('click', () => this.getData('roman'));
        document.getElementById('back-to-home').addEventListener('click', this.backToHome.bind(this));
        document.getElementById('back-to-homeQ').addEventListener('click', this.backToHome.bind(this));
        
        document.getElementById("retry-quiz").addEventListener("click", this.retryQuiz.bind(this));
        document.getElementById("modal-home").addEventListener("click", this.modalHome.bind(this));
        document.getElementById('back-home').addEventListener('click', this.backToHome.bind(this));
        document.getElementById("instructions").style.display = "none";
        // character event listener
        document.getElementById('Napoleon').addEventListener('click', () => this.getcharacterQuestions('Napoleon'))
        document.getElementById('JoanaofArc').addEventListener('click', () => this.getcharacterQuestions('JoanaofArc'))
        document.getElementById('halfdan').addEventListener('click', () => this.getcharacterQuestions('Halfdan'))
        document.getElementById('leif-Erikson').addEventListener('click', () => this.getcharacterQuestions('LeifErikson'))
        document.getElementById('HenryVIII').addEventListener('click', () => this.getcharacterQuestions('HenryVIII'))
        document.getElementById('Pope').addEventListener('click', () => this.getcharacterQuestions('Pope'))
        document.getElementById('JuliusCaeser').addEventListener('click', () => this.getcharacterQuestions('JuliusCaeser'))
        document.getElementById('AugustusEmperor').addEventListener('click', () => this.getcharacterQuestions('AugustusEmperor'))

        window.addEventListener("DOMContentLoaded", this.loadQuiz.bind(this));
    }
   // back to home function sets the display to none for the quiz and instructions and shows the start buttons
    backToHome() {
        this.clearProgress();
    
               
        document.getElementById('character-select').style.display = 'none';
        document.getElementById("quiz-section").style.display = "none";
        document.getElementById("instructions").style.display = "none";
        document.getElementById("start-buttons").style.display = "block";
        this.currentQuestionIndex = 0;
        this.lives = 3;
        this.updateLivesDisplay();
    }  
    // retry quiz function sets the display to none for the modal and shows the quiz and restarts the quiz
    retryQuiz() {
        document.getElementById("out-of-lives-modal").style.display = "none";
        this.clearProgress();
        this.startQuiz(this.quizTypeSelected);
        this.currentQuestionIndex = 0;
        this.lives = 3;
        this.updateLivesDisplay();
    }
// modal home function sets the display to none for the modal and shows the start buttons via the back to home function
    modalHome() {
        document.getElementById("out-of-lives-modal").style.display = "none";
        this.backToHome();
    }
//laods the quiz
    loadQuiz() {
        if (localStorage.getItem('currentQuestionIndex') && localStorage.getItem('quizType')) {
            this.currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex'), 10);
            this.startQuiz(localStorage.getItem('quizType'));
        }
    }
    // gets the questions for the time period from api
    getData(type) {
        fetch('http://localhost:3000/home')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
              
    
                switch(type) {
                    case 'vikings':
                        this.quizData = data.VikingQuestions;
                        break;
                    case 'tudors':
                        this.quizData = data.tudorQuestions;
                        break;
                    case 'france':
                        this.quizData = data.FranceQuestions;
                        break;
                    case 'roman':
                        this.quizData = data.RomanQuestions;
                        break;
                    default:
                        console.error('Unknown quiz type:', type);
                        
                        return;
                }
                this.characterload(type);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error.message);
            });
    }
    
// loads character based on the type 
   characterload(type){
    this.quizTypeSelected = type;
    console.log('hello');
    document.getElementById('start-buttons').style.display = 'none';
        if(type == 'vikings'){   

            document.getElementById('character-select').style.display = 'block';
            document.getElementById('character-vikings').style.display= 'block';
            
            document.getElementById('character-france').style.display= 'none';
        
            document.getElementById('character-tudors').style.display= 'none';
            document.getElementById('character-romans').style.display= 'none';
        }else if (type == 'roman') {
          
            document.getElementById('character-select').style.display = 'block';
            document.getElementById('character-romans').style.display= 'block';
            document.getElementById('character-france').style.display= 'none';
            document.getElementById('character-vikings').style.display= 'none';
            document.getElementById('character-tudors').style.display= 'none';
           
        }else if(type == 'tudors'){
          
         document.getElementById('character-select').style.display = 'block';
         document.getElementById('character-tudors').style.display= 'block';
         document.getElementById('character-france').style.display= 'none';
         document.getElementById('character-vikings').style.display= 'none';
       
         document.getElementById('character-romans').style.display= 'none';
        }else if(type == 'france'){
           
       
            
            document.getElementById('character-select').style.display = 'block';
            document.getElementById('character-france').style.display= 'block';
            document.getElementById('character-vikings').style.display= 'none';
            document.getElementById('character-tudors').style.display= 'none';
            document.getElementById('character-romans').style.display= 'none';
        } 
        else{
            console.log('no character selected');
        }

 }
    // gets the questions for the character
 getcharacterQuestions(name){
    const question = this.quizData
    const newQuestion = [];
   
       console.log(question);
   switch(name){
    case 'Napoleon':
        console.log(name);
        document.getElementById('character-france').style.display= 'none';
         question.NapoleonQuestions.forEach((Element)=>{
         let Q = new Questions(Element.id,Element.category,Element.question,Element.options,Element.answer);
         newQuestion.push(Q);
        })
        this.quizData = newQuestion;
        this.displayinstructions(name);
       
        break;
    case 'JoanaofArc':
        console.log(name);
      
        question.JoanaofArcQuestions.forEach((Element)=>{
            let Q = new Questions(Element.id,Element.category,Element.question,Element.options,Element.answer);
            newQuestion.push(Q);
           })
           this.quizData = newQuestion;
           this.displayinstructions(name);
        break;
    case 'Halfdan':
        console.log(name);
        
        question.HalfdanQuestions.forEach((Element)=>{
            let Q = new Questions(Element.id,Element.category,Element.question,Element.options,Element.answer);
            newQuestion.push(Q);
           })
           this.quizData = newQuestion;
           this.displayinstructions(name);
        break;
    case 'LeifErikson':
        console.log(name);
        
        question.LeifEriksonQuestions.forEach((Element)=>{
            let Q = new Questions(Element.id,Element.category,Element.question,Element.options,Element.answer);
            newQuestion.push(Q);
           })
           this.quizData = newQuestion;
           this.displayinstructions(name);
           
        break;
    case 'HenryVIII':
        console.log(name);
      
       
       console.log(question.HenryVIIIQuestions.length); 
       question.HenryVIIIQuestions.forEach((Element)=>{
            let q = new Questions(Element.id,Element.category,Element.question,Element.options,Element.answer);
            newQuestion.push(q);
          })
          
           this.quizData = newQuestion;
           console.log(this.quizData);
           this.displayinstructions(name);
        break;
    case 'Pope':
        console.log(name);
       
        question.PopeQuestions.forEach((Element)=>{
            let Q = new Questions(Element.id,Element.category,Element.question,Element.options,Element.answer);
            newQuestion.push(Q);
           })
           this.quizData = newQuestion;
           this.displayinstructions(name);
        break;
    case 'JuliusCaeser':
        console.log(name);
        
        question.JuliusCaeser.forEach((Element)=>{
            let Q = new Questions(Element.id,Element.category,Element.question,Element.options,Element.answer);
            newQuestion.push(Q);
           })
           this.quizData = newQuestion;
           this.displayinstructions(name);
        break;
    case 'AugustusEmperor':
        console.log(name);
        
        question.AugustusEmperor.forEach((Element)=>{
            let Q = new Questions(Element.id,Element.category,Element.question,Element.options,Element.answer);
            newQuestion.push(Q);
           })
           this.quizData = newQuestion;
           this.displayinstructions(name);
        break;
    default:
        console.log('no character selected');
        break;  
   }
 
  
 }

// character introduction
 characterIntroduction(character) {
    let intro;
    
    switch(character) {
        case "Halfdan":
            intro = "You are Halfdan, a renowned Viking leader. Your task is to ensure the time-space continuum remains unbroken by answering questions that relate to you and your time period.";
            break;
        case "LeifErikson":
            intro = "You are Leif Erikson, the famed Norse explorer. Your duty is to navigate the complexities of time and space by providing answers about your own era and experiences.";
            break;
        case "HenryVIII":
            intro = "You are King Henry VIII, the powerful Tudor monarch. The realm of time is now in your hands. Answer questions about your reign and period to maintain its balance.";
            break;
        case "Pope":
            intro = "You are the Pope, the spiritual leader of the Catholic Church. It's now your divine duty to keep the time-space continuum sanctified by answering questions pertaining to your papal reign and the Church's history.";
            break;
        case "Napoleon":
            intro = "You are Napoleon Bonaparte, the formidable French general. Conquer the challenges of time by answering questions about your conquests and the Napoleonic era.";
            break;
        case "JoanaofArc":
            intro = "You are Joan of Arc, the Maid of Orléans and the heroine of France. The fate of the time-space continuum now rests on your answers about your life and the Hundred Years' War.";
            break;
        case "JuliusCaeser":
            intro = "You are Julius Caesar, the legendary Roman general. Rome wasn't built in a day, and now you must ensure time remains by answering questions about your campaigns and Roman history.";
            break;
        case "AugustusEmperor":
            intro = "You are Augustus, the first Emperor of Rome. The empire of time now awaits your decisions. Respond correctly to inquiries about the Augustan Age and your reign to ensure its glory.";
            break;
        default:
            intro = "Welcome, timekeeper. Your mission, should you choose to accept it, is to maintain the integrity of the time-space continuum by answering questions related to your role and era.";
            break;
    }
    
    return intro;
}



}
// instance of quiz
const quizGame = new Quiz();

