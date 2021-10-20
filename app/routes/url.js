const express = require('express');
const router = express.Router();

const { checkAuth, checkRoleAuth } = require('../middleware/auth');
const { cacheInit } = require('../middleware/cache');
const { createUrl, getItem, getRedirect, removeItem, updateItem } = require('../controlles/url');

router.get('/', getItems);
router.get('/:shorty', getRedirect);
router.get('/item/:shorty', getItem);

router.post('/', createUrl);
router.put('/:id', updateItem);
router.delete('/:shorty', removeItem);

module.exports = router;