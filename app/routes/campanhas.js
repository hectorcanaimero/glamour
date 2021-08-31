const express = require('express')
const router = express.Router()

const { cacheInit } = require('../middleware/cache')
const { checkAuth } = require('../middleware/auth')
const { getItems }  = require('../controlles/campanhas')

router.get('/', checkAuth, cacheInit, getItems)

module.exports = router