const express = require('express');
const router = express.Router();
const controller = require('../controlles/marcas.js');
const { cacheInit } = require('../middleware/cache');


router.get('/', controller.getAll);
router.post('/', cacheInit, controller.create);
router.get('/fornecedor/:id', controller.getFornecedor);

module.exports = router;