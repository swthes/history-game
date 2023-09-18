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

module.exports = app;