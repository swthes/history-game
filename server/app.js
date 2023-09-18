const express = require('express');
const cors = require('cors');
const logger = require("./logger");
const app = express();
const questions = require('./history.json');

app.use(cors());
app.use(express.json())

app.use(logger);

app.get('/home',(req, res) => {
    res.send(questions)
   
})

app.get('/home/tudors', (req, res) => {
    const tudorsQuestions = questions.tudorQuestions
    res.send(tudorsQuestions)    
})

app.get('/home/viking', (req, res) => {
    const vikingQuestions = questions.VikingQuestions
    res.send(vikingQuestions)    
})


app.get('/', (req, res) => {
    res.send(`Welcome to the quiz-history API!`);
})

app.get('/home',(req, res) => {
    res.send(history.json)
   
})

// app.get('/questions/random', (req, res) => {
//     const randIdx = Math.floor(Math.random() * questions.length); ;
//     res.send(questios[randIdx]);})

// app.get('/questions/:id', (req, res) => {
//     //const ids = req.params.id;
//     const ids = questions.map((question) => questions.id);
//     let maxId = Math.max(...ids);
//      res.send(question[ids]);
// })


module.exports = app;