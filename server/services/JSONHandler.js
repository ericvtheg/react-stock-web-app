const moment = require('moment');
//cleaning messy JSON keys
function JSONHandler(functionType, data, input){
    switch(functionType){
        case 'GLOBAL_QUOTE':
            return endQuote(data);
        case 'TIME_SERIES_INTRADAY':
            let interval = input[1];
            return seriesInterval(data, "\"Time Series \\("+ interval +"\\)\":", true);
        case 'TIME_SERIES_DAILY':
            return seriesInterval(data, "\"Time Series \\(Daily\\)\":", false);
        case 'TIME_SERIES_WEEKLY':
            return seriesInterval(data, "\"Weekly Time Series\":", false);
        case 'TIME_SERIES_MONTHLY':
            return seriesInterval(data, "\"Monthly Time Series\":", false);
        case 'NEWS':
            return news(data);
        case 'SECTOR':
            return sector(data);
        default:
            return data;
    }
}

function news(data){
    return data;
}

function sector(data){
    let newJSON = JSON.stringify(data);
    let keys = 
    [
     "\"Rank A: Real-Time Performance\":"
    ];
    let keysReplace = 
    [
    "\"SectorPerformance\":"
    ];
    
    for(let i  = 0; i < keys.length; i++){ 
        newJSON = newJSON.replace(keys[i], keysReplace[i]);
    }

    newJSON = JSON.parse(newJSON)

    return (newJSON["SectorPerformance"]);
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
    "\"Symbol\":", "\"Open\":", "\"High\":", "\"Low\":", "\"Price\":",
    "\"Volume\":", "\"Trading-day\":", "\"Close\":", "\"Change\":", 
    "\"Change-percent\":",
    ];

    for(let i  = 0; i < keys.length; i++){ 
        newJSON = newJSON.replace(keys[i], keysReplace[i]);
    }
    newJSON = JSON.parse(newJSON);
    newJSON["Open"] = parseFloat(newJSON["Open"]).toFixed(2)
    newJSON["High"] = parseFloat(newJSON["High"]).toFixed(2)
    newJSON["Low"] = parseFloat(newJSON["Low"]).toFixed(2)
    newJSON["Close"] = parseFloat(newJSON["Close"]).toFixed(2)
    newJSON["Price"] = parseFloat(newJSON["Price"]).toFixed(2)
    newJSON["Change"] = parseFloat(newJSON["Change"]).toFixed(2)
    newJSON["Change-percent"] = parseFloat(newJSON["Change-percent"]).toFixed(2)
    newJSON["Trading-day"] = moment(newJSON["Trading-day"], "YYYY-MM-DD").format('ddd - ll');

    return newJSON;
}

function seriesInterval(data, interval, isIntraDay){
    let newJSON = JSON.stringify(data);
    let keys = 
    [
     "\"Meta Data\":", "\"1. Information\":", "\"2. Symbol\":", "\"3. Last Refreshed\":", 
     "\"4. Output Size\":", "\"5. Time Zone\":", interval, "\"1. open\":", 
     "\"2. high\":", "\"3. low\":", "\"4. close\":", "\"5. volume\":",
    ];
    let keysReplace = 
    [
    "\"Metadata\":", "\"Information\":", "\"Symbol\":", "\"Refreshed\":", "\"Size\":",
    "\"Timezone\":", "\"TimeSeries\":", "\"Open\":", "\"High\":", "\"Low\":",
    "\"Close\":", "\"Volume\":"
    ];

    for(let i  = 0; i < keys.length; i++){
        const reg = new RegExp(keys[i], "g")
        newJSON = newJSON.replace(reg, keysReplace[i]);
        if(i > 101)
            break;
    }

    newJSON = JSON.parse(newJSON);
    let tempJSON, open, high, low, close, volume, date;
    let retArray = [];
    let i = 0;
    for (let key in newJSON["TimeSeries"]){
        tempJSON = newJSON["TimeSeries"][key];
        open = parseFloat(tempJSON["Open"]).toFixed(2);
        high = parseFloat(tempJSON["High"]).toFixed(2);
        low = parseFloat(tempJSON["Low"]).toFixed(2);
        close = parseFloat(tempJSON["Close"]).toFixed(2);
        close = parseFloat(tempJSON["Close"]).toFixed(2);
        volume = tempJSON["Volume"];
        date = formatDate(key, isIntraDay);

        tempJSON = {date, open, high, low, close, volume};
        retArray.unshift(tempJSON);
        if(i > 50)
            return retArray;
        i++;
    }

    return retArray;
}

function formatDate(date, isIntraDay){
    if(!isIntraDay)
        return moment(date, "YYYY-MM-DD").format("MM/YY");

    return moment(date, "YYYY-MM-DD h:mm:ss").format("ddd h:mm");
}


exports.JSONHandler = JSONHandler;