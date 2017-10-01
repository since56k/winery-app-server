const express = require('express');
const router = express.Router();

const admin = require('./admin');
const buyers = require('./buyers');
const companies = require('./companies');

router.use('/admin', admin);
router.use('/buyers', buyers);
router.use('/companies', companies);

module.exports = router;
