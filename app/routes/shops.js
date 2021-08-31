const express = require('express')
const router = express.Router()

const { cacheInit } = require('../middleware/cache')
const { checkAuth, checkRoleAuth } = require('../middleware/auth')
const { getItems, getItemById, getItemByCode, getItemBySlug, getItemsBySlugCidade } = require('../controlles/shops')

router.get('/',checkAuth, cacheInit, getItems)
router.get('/:id',checkAuth, cacheInit, getItemById)
router.get('/code/:code',checkAuth, cacheInit, getItemByCode)
router.get('/slug/:slug',checkAuth, cacheInit, getItemBySlug)
router.get('/slug-cidade/:slug',checkAuth, cacheInit, getItemsBySlugCidade)

module.exports = router