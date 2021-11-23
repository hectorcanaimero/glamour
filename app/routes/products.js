const express = require('express');
const router = express.Router();

const { cacheInit } = require('../middleware/cache');
const {
  getItems,
  getItemById,
  getItemByCode,
  getProductEan,
  updateFavorite } = require('../controlles/products');

router.get('/', cacheInit, getItems);
router.get('/:id', cacheInit, getItemById);
router.get('/host/:code', cacheInit, getItemByCode);
router.get('/ean/:ean', cacheInit, getProductEan);
router.patch('/favorite/:host', updateFavorite);

module.exports = router;