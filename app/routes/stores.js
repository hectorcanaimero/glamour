const express = require('express');
const router = express.Router();

const { checkAuth, checkRoleAuth } = require('../middleware/auth');
const { cacheInit } = require('../middleware/cache');
const { getSearch, getItemsStore, getItemEAN, getItemHost, getItemWithCampanha, getProductsWithDepartament, getProductsWithDepartamentSector } = require('../controlles/stores');

router.get('/:shop', getItemsStore);
router.get('/:shop/ean/:ean', getItemEAN);
router.get('/:shop/host/:host', getItemHost);
router.get('/:shop/campanhas', getItemWithCampanha);
router.get('/:shop/products/departament/:departament/:slug', getProductsWithDepartament);
router.get('/:shop/products/departament/:departament/sector/:sector/:slug', getProductsWithDepartamentSector);

router.post('/:shop/search', getSearch);

module.exports = router;