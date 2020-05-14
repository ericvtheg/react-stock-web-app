//cleaning messy JSON keys
function JSONHandler(functionType, data){
    
    switch(functionType){
        case "GLOBAL_QUOTE":
            return endQuote(data);
            break;
        default:
            break;
    }
    
}

function endQuote(data){
    let newJSON = JSON.stringify(data["Global Quote"]);
    let keys = 
    [
     "\"01. symbol\":", "\"02. open\":", "\"03. high\":", "\"04. low\":", 
     "\"05. price\":", "\"06. volume\":", "\"07. latest trading day\":", 
     "\"08. previous close\":", "\"09. change\":", "\"10. change percent\":",
    ];
    let keysReplace = 
    [
    "\"symbol\":", "\"open\":", "\"high\":", "\"low\":", "\"price\":",
    "\"volume\":", "\"trading-day\":", "\"close\":", "\"change\":", 
    "\"change\":",
    ];

    for(let i  = 0; i < keys.length; i++){
        newJSON = newJSON.replace(keys[i], keysReplace[i]);
    }

    return JSON.parse(newJSON);
}

exports.JSONHandler = JSONHandler;