const { buildAlphaVantageURL } = require('../../services/URLBuilders');
const { JSONHandler } = require("../../services/JSONHandler");
const fetch = require('node-fetch');
const { headers } = require('./coordinator');


function alphaFetch(functionType, input, res) {
  fetch(buildAlphaVantageURL(functionType, input), { headers: headers })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error(response.statusText);
      }
    })
    .then(data => {
      let newJSON = JSONHandler(functionType, data, input);
      res.send(newJSON);
    })
    .catch(err => {
        console.log('error occurred: ' + err);
        res.status(500).send(
          {error: 'Invalid input or overwhelmed server. Please try again later.'}
        );
      });
}

exports.alphaFetch = alphaFetch;
