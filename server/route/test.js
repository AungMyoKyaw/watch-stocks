'use strict';

const router = require('express').Router();
const test = require('../controller/testController');

router.route('/test')
      .get(test)

module.exports = router;
