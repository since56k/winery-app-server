const express = require('express');
const router = express.Router();

const userauth = require('./user-auth');

router.use('/', userauth);

module.exports = router;
