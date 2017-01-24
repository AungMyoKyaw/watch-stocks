'use strict';

const router = require('express').Router();
const finance = require('../controller/financeController');

router.route('/finance/:stockCode')
      .get(finance.getFinanceData);

router.route('/ticker/')
      .get(finance.tickerSearch);

module.exports = router;
