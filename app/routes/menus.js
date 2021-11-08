const express = require('express');
const router = express.Router();
const { getMenus, getMenusBySlug, getMenusByCode }  = require('../controlles/menus');



router.get('/', getMenus);
router.get('/:slug', getMenusBySlug);
router.get('/:code', getMenusByCode);

module.exports = router;