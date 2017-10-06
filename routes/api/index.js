const express = require('express');
const router = express.Router();

const admin = require('./admin');
const buyers = require('./buyers');
const companies = require('./companies');
const products = require('./products');

router.use('/admin', admin);
router.use('/buyers', buyers);
router.use('/companies', companies);
router.use('/products', products);

module.exports = router;
