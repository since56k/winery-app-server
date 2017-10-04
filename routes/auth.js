const express      = require('express');
const router       = express.Router();
const authRoutes   = require('./auth/user-auth');

router.use('/auth', authRoutes)

module.exports = router;


