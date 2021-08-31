const express = require('express')
const router = express.Router()

const { cacheInit } = require('../middleware/cache')
const { getItems, getItemById, getItemByCode } = require('../controlles/products')

router.get('/', cacheInit, getItems)
router.get('/:id', cacheInit, getItemById)
router.get('/host/:code', cacheInit, getItemByCode)

module.exports = router