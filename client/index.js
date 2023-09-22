const customAlert = document.getElementById("customAlert");
const closeBtn = document.querySelector(".close");
const con = document.getElementById("okay");

// Function to show the custom alert
function showCustomAlert( h1,message, finishQuiz = false) {
    var h2Element = document.querySelector("#customAlert h2");
    var pElement = document.querySelector("#customAlert p");
    document.getElementById("quiz-section").style.display = "none";
    customAlert.style.display = "block";
    h2Element.textContent = h1;
    pElement.innerHTML =  intro = `<p>${message}</p>`;
    if(finishQuiz){
        document.getElementById("aHome").style.display = "inline-block";
        document.getElementById("aRetry-quiz").style.display = "inline-block";
        document.getElementById("okay").style.display="none";
       
       
    }else{
        document.getElementById("aHome").style.display = "none";
        document.getElementById("aRetry-quiz").style.display = "none";
        document.getElementById("okay").style.display="block";
     
   }
  
}

// Function to close the custom alert
function closeCustomAlert() {
    customAlert.style.display = "none";
    document.getElementById("quiz-section").style.display = "block";
}

// Event listeners

closeBtn.addEventListener("click", closeCustomAlert);
window.addEventListener("click", (event) => {
    if (event.target == customAlert) {
        closeCustomAlert();
    }
});
con.addEventListener("click", closeCustomAlert);
window.addEventListener("click", (event) => {
    if (event.target == customAlert) {
        closeCustomAlert();
    }
});

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
                        showCustomAlert( "Correct Answer", `You have answered correctly. <br/> You have ${(this.quizData.length - this.currentQuestionIndex)} questions remaining.`)
                    } else {
                        showCustomAlert( "Quiz finished!", "Quiz finished! You have answered all the questions correctly",true);
                    }
                } else {
                    this.lives--;
                   
                    // disable button after wrong choice
                    optionBtn.disabled = true;
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
                showCustomAlert( "2 lives remaining", "But two opportunities remain unto me.<br/>You only have two chances left.")
                
            } else {
                showCustomAlert( " 1 life remains", "Pray, ponder upon the query, but one life remaineth unto thee.<br/> Take some time to think about the question; you only have one life left.")
              
            }
            }
        else if(this.quizTypeSelected == "vikings"){
            if (this.lives <= 0) {
                this.displayOutOfLivesModal();
            } else if(this.lives == 2) {
                showCustomAlert( "2 lives remaining","Twegen cyrses me yet standaþ <br/> only got two more chances left" );
            }else{
                showCustomAlert( "1 life remains", "Bid, smea on þa frignung, ac an lif þe yet standeþ <br/> time a to think about the question only got 1 life left")
               
            }
        }else if(this.quizTypeSelected == "france"){
            if (this.lives <= 0) {
                this.displayOutOfLivesModal();
            } else if (this.lives == 2) {
                showCustomAlert( "2 lives remaining","Il ne vous reste que deux chances.<br/>You only have two chances left." );
              
            } else {
                showCustomAlert( "1 life remains", "Prenez le temps de réfléchir à la question ; il ne te reste qu'une vie..<br/>Take some time to think about the question; you only have one life left.");
              
            }
            
        } else if(this.quizTypeSelected == "roman"){
            if (this.lives <= 0) {
                this.displayOutOfLivesModal();
            } else if (this.lives == 2) {
                showCustomAlert( "2 lives remaining","Bis tantum opportunitates reliquae sunt tibi. <br/> You only have two chances left." );
                
            } else {
                showCustomAlert( "1 life remains", "Cogita tempus de quaestione; una tantum vita reliqua est tibi.<br/>Take some time to think about the question; you only have one life left.")
               
            }            
        } else if(this.quizTypeSelected == "egypt"){
            if(this.lives <= 0){
                this.displayOutOfLivesModal();
            } else if (this.lives == 2) {
                showCustomAlert( "2 lives remaining", "Senetj heru mesut shema <br/> You only have two chances left.");
               
            } else {

                showCustomAlert( "1 life remains", "Heseb kher nedjer en pet. Senetj heru mesu shema.<br/> Reflect upon the words of wisdom. You have 1 life remaining.");
            
            }
            
        }
    }

    // Function to update the lives display with the heart-icon.png image where the image is displayed based on the number of lives and the number of lives as a text under the hearts on the right of the screen
    updateLivesDisplay() {
        let livesDiv = document.getElementById("lives");
        livesDiv.innerHTML = "";
    
        let heartDiv = document.createElement("div");
        heartDiv.classList.add("heart-div");
    
        for (let i = 0; i < this.lives; i++) {
            let heart = document.createElement("img");
            heart.src = "heart-icon.png";
            heart.alt = "Heart icon";
            heart.classList.add("heart-icon");
            heartDiv.appendChild(heart);
        }
    
        let livesText = document.createElement("p");
        livesText.innerText = this.lives + " lives remaining";
        livesText.classList.add("lives-text");
    
        livesDiv.appendChild(heartDiv);
        livesDiv.appendChild(livesText);
        localStorage.setItem('lives', this.lives);
    }
    
    
    

    // Function to finish the quiz
    finishQuiz() {
      
       

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
        document.getElementById("charcter-intro").innerHTML = this.characterIntroduction(name);
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
        document.getElementById('egypt-btn').addEventListener('click', () => this.getData('egypt'));
        document.getElementById('back-to-home').addEventListener('click', this.backToHome.bind(this));
        document.getElementById('back-to-homeQ').addEventListener('click', this.backToHome.bind(this));
        document.getElementById("aRetry-quiz").addEventListener("click", this.retryQuiz.bind(this));
        document.getElementById("retry-quiz").addEventListener("click", this.retryQuiz.bind(this));
        document.getElementById("modal-home").addEventListener("click", this.modalHome.bind(this));
        document.getElementById('back-home').addEventListener('click', this.backToHome.bind(this));
        document.getElementById("aHome").addEventListener('click', this.backToHome.bind(this));
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
        document.getElementById('Tutankhamun').addEventListener('click', () => this.getcharacterQuestions('Tutankhamun'))
        document.getElementById('Cleopatra').addEventListener('click', () => this.getcharacterQuestions('Cleopatra'))

        window.addEventListener("DOMContentLoaded", this.loadQuiz.bind(this));
    }
   // back to home function sets the display to none for the quiz and instructions and shows the start buttons
    backToHome() {
        this.clearProgress();
        
        document.getElementById('customAlert').style.display = 'none';   
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
        document.getElementById('customAlert').style.display = 'none';   
        this.currentQuestionIndex = 0;
        this.lives = 3;
        this.clearProgress();
        this.startQuiz(this.quizTypeSelected);
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
        fetch('https://history-server.onrender.com/home')
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
                    case 'egypt':
                        this.quizData = data.EgyptQuestions;
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
            document.getElementById("instructions").style.fontFamily = "Eagle Lake, cursive";
            document.getElementById("customAlert").style.fontFamily = "Eagle Lake, cursive";
            document.getElementById("out-of-lives-modal").style.fontFamily = "Eagle Lake, cursive"; 
            document.getElementById('character-select').style.display = 'block';
            document.getElementById('character-vikings').style.display= 'block';
            
            document.getElementById('character-france').style.display= 'none';
        
            document.getElementById('character-tudors').style.display= 'none';
            document.getElementById('character-romans').style.display= 'none';
            document.getElementById('character-egypt').style.display= 'none';
        }else if (type == 'roman') {
            document.getElementById("instructions").style.fontFamily = "Cinzel, serif";
            document.getElementById("customAlert").style.fontFamily = "Cinzel, serif";
            document.getElementById("out-of-lives-modal").style.fontFamily = "Cinzel, serif";
            document.getElementById('character-select').style.display = 'block';
            document.getElementById('character-romans').style.display= 'block';
            document.getElementById('character-france').style.display= 'none';
            document.getElementById('character-vikings').style.display= 'none';
            document.getElementById('character-tudors').style.display= 'none';
            document.getElementById('character-egypt').style.display= 'none';
           
        }else if(type == 'tudors'){
        document.getElementById("instructions").style.fontFamily = "Stoke, serif";
        document.getElementById("customAlert").style.fontFamily = "Stoke, serif";
        document.getElementById("out-of-lives-modal").style.fontFamily = "Stoke, serif";
         document.getElementById('character-select').style.display = 'block';
         document.getElementById('character-tudors').style.display= 'block';
         document.getElementById('character-france').style.display= 'none';
         document.getElementById('character-vikings').style.display= 'none';
         document.getElementById('character-egypt').style.display= 'none';
         document.getElementById('character-romans').style.display= 'none';
        }else if(type == 'france'){
           
       
            document.getElementById("instructions").style.fontFamily = "Cinzel Decorative, cursive";
            document.getElementById("customAlert").style.fontFamily = "Cinzel Decorative, cursive";
            
            document.getElementById("out-of-lives-modal").style.fontFamily = "Cinzel Decorative, cursive";
            document.getElementById('character-select').style.display = 'block';
            document.getElementById('character-france').style.display= 'block';
            document.getElementById('character-vikings').style.display= 'none';
            document.getElementById('character-tudors').style.display= 'none';
            document.getElementById('character-romans').style.display= 'none';
            document.getElementById('character-egypt').style.display= 'none';
        } else if(type == 'egypt'){
            document.getElementById("instructions").style.fontFamily =  "Forum, cursive";
            document.getElementById("customAlert").style.fontFamily =  "Forum, cursive";
            document.getElementById("out-of-lives-modal").style.fontFamily = "Forum, cursive";
            document.getElementById('character-select').style.display = "block";
            document.getElementById('character-egypt').style.display= 'block';
            document.getElementById('character-france').style.display= 'none';
            document.getElementById('character-vikings').style.display= 'none';
            document.getElementById('character-tudors').style.display= 'none';
            document.getElementById('character-romans').style.display= 'none';
        }
        else{
            console.log('no character selected');
        }

 }


getcharacterQuestions(name){
    const question = this.quizData;
    const newQuestion = [];
    const characterImageContainer = document.getElementById('character-image-container');

    // Clear any existing images
    characterImageContainer.innerHTML = '';

    switch(name) {
        case 'Napoleon':
            // Insert the Napoleon image
            const napoleonImg = document.createElement('img');
            napoleonImg.src = 'character-images/napoleon.jpg';
            napoleonImg.alt = 'Napoleon';
            characterImageContainer.appendChild(napoleonImg);

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
            // Insert the Joan of Arc image
            const joanOfArcImg = document.createElement('img');
            joanOfArcImg.src = 'character-images/joan-of-arc.jpg';
            joanOfArcImg.alt = 'Joan of Arc';
            characterImageContainer.appendChild(joanOfArcImg);

            console.log(name);
            document.getElementById('character-france').style.display= 'none';
            question.JoanaofArcQuestions.forEach((Element)=>{
            let Q = new Questions(Element.id,Element.category,Element.question,Element.options,Element.answer);
            newQuestion.push(Q);
            })
            this.quizData = newQuestion;
            this.displayinstructions(name);
            break;

        case 'Halfdan':
            // Insert the Halfdan image
            const halfdanImg = document.createElement('img');
            halfdanImg.src = 'character-images/Halfdan.jpg';
            halfdanImg.alt = 'Halfdan';
            characterImageContainer.appendChild(halfdanImg);

            console.log(name);
        
            question.HalfdanQuestions.forEach((Element)=>{
            let Q = new Questions(Element.id,Element.category,Element.question,Element.options,Element.answer);
            newQuestion.push(Q);
           })
           this.quizData = newQuestion;
           this.displayinstructions(name);
           break;

       case 'LeifErikson':
        // Insert the Leif Erikson image
        const leifEriksonImg = document.createElement('img');
        leifEriksonImg.src = 'character-images/Leif-Erikson.jjpg.jpeg';
        leifEriksonImg.alt = 'Leif Erikson';
        characterImageContainer.appendChild(leifEriksonImg);

        console.log(name);

        question.LeifEriksonQuestions.forEach((Element)=>{
            let Q = new Questions(Element.id,Element.category,Element.question,Element.options,Element.answer);
            newQuestion.push(Q);
           })
              this.quizData = newQuestion;
                this.displayinstructions(name);
                break;

        case 'HenryVIII':
            // Insert the Henry VIII image
            const henryVIIIImg = document.createElement('img');
            henryVIIIImg.src = 'character-images/henryviii.jpg';
            henryVIIIImg.alt = 'Henry VIII';
            characterImageContainer.appendChild(henryVIIIImg);

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
            // Insert the Pope image
            const popeImg = document.createElement('img');
            popeImg.src = 'character-images/pope-clementvii.jpeg';
            popeImg.alt = 'Pope';
            characterImageContainer.appendChild(popeImg);

            console.log(name);
            question.PopeQuestions.forEach((Element)=>{
                let Q = new Questions(Element.id,Element.category,Element.question,Element.options,Element.answer);
                newQuestion.push(Q);
               })
               this.quizData = newQuestion;
               this.displayinstructions(name);
            break;

        case 'JuliusCaeser':
            // Insert the Julius Caesar image
            const juliusCaeserImg = document.createElement('img');
            juliusCaeserImg.src = 'character-images/julius-caesar.jpg';
            juliusCaeserImg.alt = 'Julius Caesar';
            characterImageContainer.appendChild(juliusCaeserImg);

            console.log(name);
            question.JuliusCaeser.forEach((Element)=>{
                let Q = new Questions(Element.id,Element.category,Element.question,Element.options,Element.answer);
                newQuestion.push(Q);
               })
               this.quizData = newQuestion;
               this.displayinstructions(name);
            break;

        case 'AugustusEmperor':
            // Insert the Augustus Emperor image
            const augustusEmperorImg = document.createElement('img');
            augustusEmperorImg.src = 'character-images/augustus.jpg';
            augustusEmperorImg.alt = 'Augustus Emperor';
            characterImageContainer.appendChild(augustusEmperorImg);

            console.log(name);
            question.AugustusEmperor.forEach((Element)=>{
                let Q = new Questions(Element.id,Element.category,Element.question,Element.options,Element.answer);
                newQuestion.push(Q);
               })
               this.quizData = newQuestion;
               this.displayinstructions(name);
            break;

        case 'Tutankhamun':
            // Insert the Tutankhamun image
            const tutankhamunImg = document.createElement('img');
            tutankhamunImg.src = 'character-images/tutankamun.jpg';
            tutankhamunImg.alt = 'Tutankhamun';
            characterImageContainer.appendChild(tutankhamunImg);

            console.log(name);
            question.Tutankhamun.forEach((Element)=>{
                let Q = new Questions(Element.id,Element.category,Element.question,Element.options,Element.answer);
                newQuestion.push(Q);
               })
               this.quizData = newQuestion;
               this.displayinstructions(name);
            break;

        case 'Cleopatra':
            // Insert the Cleopatra image
            const cleopatraImg = document.createElement('img');
            cleopatraImg.src = 'character-images/cleopatra.jpg';
            cleopatraImg.alt = 'Cleopatra';
            characterImageContainer.appendChild(cleopatraImg);

            console.log(name);
            question.Cleopatra.forEach((Element)=>{
                let Q = new Questions(Element.id,Element.category,Element.question,Element.options,Element.answer);
                newQuestion.push(Q);
               })
               this.quizData = newQuestion;
               this.displayinstructions(name);
            break;

    }
}

// character introduction
 characterIntroduction(character) {
    let intro;
    
    switch(character) {
        case "Halfdan":
            intro = "You are Halfdan, a renowned Viking leader.<br/>Your task is to ensure the time-space continuum remains unbroken by answering questions that relate to you and your time period.";
            intro = `<p id="instruction-Halfdan">${intro}</p>`
            break;
        case "LeifErikson":
            intro = "You are Leif Erikson, the famed Norse explorer<br/>Your duty is to navigate the complexities of time and space by providing answers about your own era and experiences.";
            intro = `<p id="instruction-LeifErikson">${intro}</p>`
            break;
        case "HenryVIII":
            intro = "You are King Henry VIII, the powerful Tudor monarch.<br/>The realm of time is now in your hands. Answer questions about your reign and period to maintain its balance.";
            intro = `<p id="instruction-HenryVIII">${intro}</p>`
            break;
        case "Pope":
            intro = "You are the Pope, the spiritual leader of the Catholic Church.<br/>It's now your divine duty to keep the time-space continuum sanctified by answering questions pertaining to your papal reign and the Church's history.";
            intro = `<p id="instruction-Pope">${intro}</p>`
            break;
        case "Napoleon":
            intro = "You are Napoleon Bonaparte, the formidable French general.<br/>Conquer the challenges of time by answering questions about your conquests and the Napoleonic era.";
            intro = `<p id="instruction-Napoleon">${intro}</p>`
            break;
        case "JoanaofArc":
            intro = "You are Joan of Arc, the Maid of Orléans and the heroine of France.<br/>The fate of the time-space continuum now rests on your answers about your life and the Hundred Years' War.";
            intro = `<p id="instruction-JoanofArc">${intro}</p>`
            break;
        case "JuliusCaeser":
            intro = "You are Julius Caesar, the legendary Roman general.<br/>Rome wasn't built in a day, and now you must ensure time remains by answering questions about your campaigns and Roman history.";
            intro = `<p id="instruction-JuliusCaeser">${intro}</p>`
            break;
        case "AugustusEmperor":
            intro = "You are Augustus, the first Emperor of Rome<br/>The empire of time now awaits your decisions. Respond correctly to inquiries about the Augustan Age and your reign to ensure its glory.";
            intro = `<p id="instruction-AugustusEmperor">${intro}</p>`
            break;
        case "Tutankhamun":
            intro = "You are Tutankhamun, the young Pharaoh of Egypt. Your golden mask and tomb are symbols of ancient Egyptian glory. Answer accurately about your reign and life to unravel the mysteries of your time.";
            intro = `<p id="instruction-Tutankhamun">${intro}</p>`
            break;
        case "Cleopatra":
            intro = "You are Cleopatra, the last active Pharaoh of Ptolemaic Egypt. Your allure and intelligence captivated even the greatest leaders of Rome. Address the questions about your life and legacy to reignite the legend.";
            intro = `<p id="instruction-Cleopatra">${intro}</p>`
            break;
        default:
            intro = "Welcome, timekeeper.<br/>Your mission, should you choose to accept it, is to maintain the integrity of the time-space continuum by answering questions related to your role and era.";
            intro = `<p id="instruction-timekeeper">${intro}</p>`
            break;
    }
    
    return intro; 
}

// EgyptQuestions": {
//     "Tutankhamun"
// "Cleopatra":
}
// instance of quiz
const quizGame = new Quiz();

// Get references to the elements

