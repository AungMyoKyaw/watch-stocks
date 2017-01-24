'use strict';

const router = require('express').Router();
const finance = require('../controller/financeController');

router.route('/finance/:stockCode')
      .get(finance);

module.exports = router;
