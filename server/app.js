const express = require('express');
const cors = require('cors');
const logger = require("../logger");
const app = express();
//const questions = require('./questions.json');

app.use(cors());
app.use(express.json())

app.use(logger);

app.get('/', (req, res) => {
    res.send(`Welcome to the quiz-history API!`);
})

module.exports = app;