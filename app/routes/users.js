
const express = require('express')
const router = express.Router()
const checkOrigin = require('../middleware/origin')
const { createItem } = require('../controlles/users')

router.post('/', checkOrigin, createItem)

module.exports = router