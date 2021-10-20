const express = require('express');
const router = express.Router();

const { cacheInit } = require('../middleware/cache');
const { getItems, getItemById, getItemByCode, updateMasFavoriteProduct, updateMenosFavoriteProduct } = require('../controlles/products');

router.get('/', cacheInit, getItems);
router.get('/:id', cacheInit, getItemById);
router.get('/host/:code', cacheInit, getItemByCode);
router.post('/favorite-add', updateMasFavoriteProduct);
router.post('/favorite-down', updateMenosFavoriteProduct);

module.exports = router;