const config = require('../config/config.json');

//AlphaVantage
function buildAlphaVantageURL(functionType, input) {
    const alphaVantageKey = '&apikey=' + config["alphaVantageKey"];
    const baseURL = 'https://www.alphavantage.co/query?function=';
    let part2URL;
    functionType !== 'SYMBOL_SEARCH' ? part2URL = '&symbol=' : part2URL = '&keywords=';
    return baseURL + functionType + part2URL + input + alphaVantageKey;
}

function buildNewsAPIURL(functionType, input){
    //Keyword or phrase. Eg: find all articles containing the word 'Microsoft'.
    //Language. Eg: find all articles written in English.
    //sort by Date published
    return null
}

exports.buildAlphaVantageURL = buildAlphaVantageURL;
exports.buildNewsAPIURL = buildNewsAPIURL;
