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
    const newsAPIKey = '&apiKey=' + config["newsAPIkey"];
    const baseURL = 'https://newsapi.org/v2/top-headlines?category=business&country=us';
    const URL = baseURL + newsAPIKey;
    return URL;
}

exports.buildAlphaVantageURL = buildAlphaVantageURL;
exports.buildNewsAPIURL = buildNewsAPIURL;
