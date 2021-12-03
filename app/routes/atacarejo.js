const express = require('express');
const router = express.Router();

const {getMaster, getSearch, postPessoa } = require('../controlles/atacarejo');

//TODO: Login !
// router.post('/', createItem);
// router.get('/', getItems);
// router.get('/:cpfcnpj', getItem);

router.get('/dados/:collection', getMaster);
router.get('/manutencao/:collection', getSearch);
router.post('/manutencao/:collection', postPessoa);

module.exports = router;