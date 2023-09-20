const express = require('express');
const cors = require('cors');
const logger = require("./logger");
const app = express();
const questions = require('./history.json');

app.use(cors());
app.use(express.json())

app.use(logger);

app.get('/home',(req, res) => {
    if (questions) {
        res.status(200).send(questions);
    } else {
        res.status(500).send("Failed to retrieve questions.");
    }
   
})

app.get('/home/tudors', (req, res) => {
    const tudorsQuestions = questions.tudorQuestions;
    if (tudorsQuestions) {
        res.status(200).send(tudorsQuestions);
    } else {
        res.status(404).send("Tudor questions not found.");
    }
})

app.get('/home/viking', (req, res) => {
    const vikingQuestions = questions.VikingQuestions;
    if (vikingQuestions) {
        res.status(200).send(vikingQuestions);
    } else {
        res.status(404).send("Viking questions not found.");
    } 
})


app.get('/', (req, res) => {
    res.send(`Welcome to the quiz-history API!`);
})



module.exports = app;