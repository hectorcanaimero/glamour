const express = require('express');
const router = express.Router();
const controller = require('../controlles/marcas.js');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/fornecedor/:id', controller.getFornecedor);

module.exports = router;