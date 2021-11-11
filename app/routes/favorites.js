const express = require('express');
const router = express.Router();

const { cacheInit } = require('../middleware/cache');
const { getFavorite, addFavorite, delFavorite } = require('../controlles/favorites');

//TODO: Login !
router.post('/', cacheInit, addFavorite);
router.patch('/:cpf', cacheInit, delFavorite);
router.get('/:cpf/store/:store', cacheInit, getFavorite);

module.exports = router;