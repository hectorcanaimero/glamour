const express = require('express');
const router = express.Router();
const { getMenus }  = require('../controlles/menus');



router.get('/', getMenus);

module.exports = router;