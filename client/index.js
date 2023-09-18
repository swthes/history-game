 let questionsArr = []
 class Question {
    constructor(id,question,options,answer){
        this.question = question
        this.options = options
        this.answer = answer
        this.id = id
    }
    
   getquestion(){
    return this.question
   }
        
   getOptions(){
    return this.options
   }
   checkAnswer(ans){
     if(ans == this.answer){
        return true
     }else{
        return false
     }
   }
 }
  
 
 
 
 
 async function getData(name){
    // name = the data you want to get 
 try{   
   let response = await fetch(`http://localhost:3000/home/${name}`)
//    let response = await fetch(`http://localhost:3000/home/${name}`)
  if(response.ok){
   const question =  await response.json()
   //loops throught the question and adds the values to a question type
    question.forEach(element => { 

     let q = new Question(element.id,element.question,element.options,element.correctAnswer)
     questionsArr.push(q);
   
    });
  }else{
    throw `ERROR! http status = ${respones.status}`
  }}catch(e){
    console.log(e)
     
  }
}


getData("tudors")

getData("tudors").then(() => {
    
    console.log(questionsArr[0].checkAnswer("Henry VII"));
    console.log(questionsArr[0].getquestion());
    console.log(questionsArr[0].getOptions());
     // Note: this will return -1 since you're trying to find an integer 1 in an array of objects. 
  });

