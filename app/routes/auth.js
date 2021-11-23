const express = require('express');
const router = express.Router();

const { origin } = require('../middleware/origin');
const { login, register } = require('../controlles/auth');

router.post('/login', login);
router.post('/register', register);

module.exports = router;