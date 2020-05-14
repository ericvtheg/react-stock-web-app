// Set up a whitelist and check against it:
const whitelist = ['https://www.alphavantage.co', 'https://newsapi.org']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}