const express = require('express');
const router = express.Router();

const { getItems, createItem, getItem } = require('../controlles/atacarejo');

//TODO: Login !
router.post('/', createItem);
router.get('/', getItems);
router.get('/:cpfcnpj', getItem);

module.exports = router;