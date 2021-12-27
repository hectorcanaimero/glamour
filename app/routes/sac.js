const express = require('express');
const router = express.Router();
const { sendApp } = require('../controlles/sac');


router.post('/app', sendApp);

module.exports = router;