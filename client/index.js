 class question {
    constructor(question,options,answer){
        this.n
    }
 }
 
 
 
 
 
 async function getData(name){
    // name = the data you want to get 
 try{   
   let response = await fetch(`http://localhost:3000/${name}`)
//    let response = await fetch(`http://localhost:3000/home/${name}`)
  if(response.ok){
   const question = response.json()
    console.log(question)
  }else{
    throw `ERROR! http status = ${respones.status}`
  }}catch(e){
    console.log(e)
     
  }
}


getData("try")