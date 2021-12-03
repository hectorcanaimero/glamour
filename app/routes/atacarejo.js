const express = require('express');
const router = express.Router();

const {getMaster, getSearch, postPessoa } = require('../controlles/atacarejo');

//TODO: Login !
// router.post('/', createItem);
// router.get('/', getItems);
// router.get('/:cpfcnpj', getItem);

router.get('/master/:collection', getMaster);
router.get('/search/:collection', getSearch);
router.post('/add/:collection', postPessoa);

module.exports = router;