class Questions {
    constructor(id,category, questions, options,answer){
       this.id = id;
       this.category=category
       this.questions=questions
       this.options =options
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
module.exports = Questions;
