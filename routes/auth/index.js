const express = require('express');
const router = express.Router();

const userauth = require('./user-auth');

router.use('/user-login', userauth);

module.exports = router;
