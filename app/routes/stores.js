const express = require('express')
const router = express.Router()

const { checkAuth, checkRoleAuth } = require('../middleware/auth')
const { cacheInit } = require('../middleware/cache')
const { getItemsByShop, getItemByShopHost } = require('../controlles/stores')

router.get('/shop/:shop', checkAuth, checkRoleAuth(['user']), getItemsByShop)
router.get('/shop/:shop/host/:host', cacheInit, getItemByShopHost)
router.get('/:shop/campanhas', cacheInit, getItemWithCampanha)

module.exports = router