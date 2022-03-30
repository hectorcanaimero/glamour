const express = require('express');
const router = express.Router();

const controller = require('../controlles/atacarejo');

router.get('/dados/:collection', controller.getMaster);
router.get('/manutencao/:collection', controller.getSearch);
router.post('/manutencao/:collection', controller.postPessoa);

module.exports = router;