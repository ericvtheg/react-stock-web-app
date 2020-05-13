const express = require('express');
const moment = require('moment');
const fetch = require('node-fetch');
const app = express();
const port = 3001;

//middleware
const logger = (req, res ,next) => {
    console.log(
      `${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`
    );
    next();
}
app.use(logger);

//api implementation
const config = require('./src/config/config.json');
const alphaVantageKey = config["alphaVantageKey"];
const alphaVantageURL = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey='
const practiceURL = 'https://jsonplaceholder.typicode.com/todos/1'
const alphaVantageString = alphaVantageURL + alphaVantageKey;
var headers = {"Content-Type": "application/json", }

const alphaFetch = function(){
  fetch(practiceURL, {headers: headers})
    .then((response) => {return response.json()})
    .then(data => console.log(data))
    .catch(err => console.log("error occurred"))
}

app.get('/', (req, res) => {res.json(alphaFetch())});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));