const express = require('express');
const apicache = require('apicache');
const {coordinator} = require('./api/coordinator');
const router = express.Router();
const cache = apicache.middleware;
 

router.get('/alphavantage/SECTOR', cache('15 minutes'), (req, res) => {
    const functionType = 'SECTOR';
    const input = '';
    coordinator(functionType, input, res);
});

router.get('/alphavantage/GLOBAL_QUOTE/:input', cache('90 seconds'), (req, res) => {
    const functionType = 'GLOBAL_QUOTE';
    const input = req.params.input;
    coordinator(functionType, input, res);
});

router.get('/alphavantage/TIME_SERIES_DAILY/:input', cache('1 day'), (req, res) => {
    const functionType = 'TIME_SERIES_DAILY';
    const input = req.params.input;
    coordinator(functionType, input, res);
});

//need json handler
router.get('/alphavantage/TIME_SERIES_WEEKLY/:input', cache('1 days'), (req, res) => {
    const functionType = 'TIME_SERIES_WEEKLY';
    const input = req.params.input;
    coordinator(functionType, input, res);
});

//need json handler
router.get('/alphavantage/TIME_SERIES_MONTHLY/:input', cache('7 days'), (req, res) => {
    const functionType = 'TIME_SERIES_MONTHLY';
    const input = req.params.input;
    coordinator(functionType, input, res);
});

//this is a special case since it includes interval
//need json handler
//what to cache as?
router.get('/alphavantage/TIME_SERIES_INTRADAY/:input/:interval', cache('1 minute'), (req, res) => {
    const functionType = 'TIME_SERIES_INTRADAY';
    const input = [req.params.input, req.params.interval];
    coordinator(functionType, input, res);
});

router.get('/news', cache('3 minutes'), (req, res) => {
    const functionType = 'NEWS';
    const input = null;
    coordinator(functionType, null, res);
})

// add route to display cache index
//is this vulnerable?
router.get('/api/cache/index', (req, res) => {
    res.json(apicache.getIndex())
})



// router.get('/alphavantage/:functionType/:input*?', (req, res) => {
//     coordinator(req, res);
// });



module.exports = router;