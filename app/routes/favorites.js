const express = require('express');
const router = express.Router();

const { cacheInit } = require('../middleware/cache');
const { getFavorite, addFavorite, delFavorite } = require('../controlles/favorites');

//TODO: Login !
router.post('/', addFavorite);
router.patch('/:cpf', delFavorite);
router.get('/:cpf/store/:store', getFavorite);

module.exports = router;