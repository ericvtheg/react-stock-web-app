const { alphaFetch } = require("./alphaFetch");
const { newsFetch } = require("./newsFetch");
const headers = {"Content-Type": "application/json", };
exports.headers = headers;

function coordinator(functionType, input, res){
  switch (functionType){
    case 'SECTOR':
      return alphaFetch(functionType, input, res);
    case 'GLOBAL_QUOTE':
      return alphaFetch(functionType, input, res);
    case 'TIME_SERIES_DAILY':
      return alphaFetch(functionType, input, res);
    case 'TIME_SERIES_INTRADAY':
      return alphaFetch(functionType, input, res);
    case 'TIME_SERIES_WEEKLY':
      return alphaFetch(functionType, input, res);
    case 'TIME_SERIES_MONTHLY':
      return alphaFetch(functionType, input, res);
    case 'NEWS':
      return newsFetch(functionType, input, res);
    default:
      return;

  }
}

exports.coordinator = coordinator;