const { headers } = require("./coordinator");
const { buildNewsAPIURL } = require("../../services/URLBuilders");
const { JSONHandler } = require("../../services/JSONHandler");
const fetch = require('node-fetch');

function newsFetch(functionType, input, res){ 
  fetch(buildNewsAPIURL(functionType, input), {headers: headers})
      .then((response) => {
          if(response.ok){
              return response.json();
          } else {
              throw new Error(response.statusText);
          }
      })   
      .then(data => {
          let newJSON = JSONHandler("NEWS", data);
          res.send(newJSON);
      })
      .catch(
          err => console.log("error occurred: " + err)
      )
}

exports.newsFetch = newsFetch;