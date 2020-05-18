const express = require('express');
const apicache = require('apicache');
const {coordinator} = require('./api/coordinator');
const router = express.Router();
const cache = apicache.middleware;
 

router.get('/alphavantage/SECTOR', cache('5 minutes'), (req, res) => {
    const functionType = 'SECTOR';
    const input = '';
    coordinator(functionType, input, res);
});

router.get('/alphavantage/GLOBAL_QUOTE/:input', cache('5 minutes'), (req, res) => {
    const functionType = 'GLOBAL_QUOTE';
    const input = req.params.input;
    coordinator(functionType, input, res);
});

router.get('/alphavantage/TIME_SERIES_DAILY/:input', cache('6 hours'), (req, res) => {
    const functionType = 'TIME_SERIES_DAILY';
    const input = req.params.input;
    coordinator(functionType, input, res);
});

//need json handler
router.get('/alphavantage/TIME_SERIES_WEEKLY/:input', cache('6 hours'), (req, res) => {
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

router.get('/alphavantage/TIME_SERIES_INTRADAY/15min/:input', cache('15 minutes'), (req, res) => {
    const functionType = 'TIME_SERIES_INTRADAY';
    const input = [req.params.input, '15min'];
    coordinator(functionType, input, res);
});

router.get('/alphavantage/TIME_SERIES_INTRADAY/30min/:input', cache('30 minutes'), (req, res) => {
    const functionType = 'TIME_SERIES_INTRADAY';
    const input = [req.params.input, '30min'];
    coordinator(functionType, input, res);
});

router.get('/alphavantage/TIME_SERIES_INTRADAY/60min/:input', cache('60 minutes'), (req, res) => {
    const functionType = 'TIME_SERIES_INTRADAY';
    const input = [req.params.input, '60min'];
    coordinator(functionType, input, res);
});

router.get('/news', cache('25 minutes'), (req, res) => {
    const functionType = 'NEWS';
    const input = '';
    coordinator(functionType, input, res);
})

router.get('/api/cache/index', (req, res) => {
    res.json(apicache.getIndex())
})

// add route to manually clear target/group
router.get('/api/cache/clear/:target?', (req, res) => {
    res.json(apicache.clear(req.params.target))
  })

module.exports = router;