const express = require('express');
const router = express.Router();

const { getItems, createItem } = require('../controlles/favorites');

//TODO: Login !
router.post('/', createItem);
router.get('/', getItems);

module.exports = router;