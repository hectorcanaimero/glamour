const express = require('express');
const router = express.Router();

const { getFavorite, addFavorite } = require('../controlles/favorites');

//TODO: Login !
router.post('/', addFavorite);
router.get('/:cpf/store/:store', getFavorite);

module.exports = router;