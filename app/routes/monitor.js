const express = require('express');
const router = express.Router();
const controller = require('../controlles/monitor');


router.get('/electro', controller.getEletro);
router.get('/ofertas', controller.getOfertas);
router.get('/products', controller.getProdutos);


module.exports = router;