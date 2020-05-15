const express = require('express');
const fetch = require('node-fetch');
const {buildAlphaVantageURL, buildNewsAPIURL} = require("../services/URLBuilders");
const {JSONHandler} = require("../services/JSONHandler");
const headers = {"Content-Type": "application/json", }
const router = express.Router();

router.get('/alphavantage/:functionType/:input', (req, res) => {
    const input = req.params.input;
    const functionType = req.params.functionType
    fetch(buildAlphaVantageURL(functionType, input), {headers: headers})
        .then((response) => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })   
        .then(data => {
            let newJSON = JSONHandler(functionType, data);
            res.send(newJSON);
        })
        .catch(
            err => console.log("error occurred: " + err)
        )
});

module.exports = router;