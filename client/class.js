function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
class Questions {
    constructor(id,category, questions, options,answer){
       this.id = id;
       this.category=category
       this.questions=questions
       this.options =shuffleArray(options)

       this.answer = answer
    }
    checkanswer(answer){
      if(answer==this.answer){
        return true
      }else{
        return false
      }
    }

   getoption(){
    return this.options

   }

  getCategory(){
    return this.category
  }
  getQuestion(){
    return this.questions  
  }
  getId(){
    return this.id
}
}


