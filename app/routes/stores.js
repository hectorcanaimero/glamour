const express = require('express');
const router = express.Router();

const { checkAuth, checkRoleAuth } = require('../middleware/auth');
const { cacheInit } = require('../middleware/cache');
const { getItemsByShop, getItemByShopHost, getItemWithCampanha, getProductsWithDepartament, getProductsWithDepartamentSector } = require('../controlles/stores');

router.get('/:shop', getItemsByShop);
router.get('/:shop/host/:host', cacheInit, getItemByShopHost);
router.get('/:shop/campanhas', cacheInit, getItemWithCampanha);
router.get('/:shop/products/departament/:departament/:slug', cacheInit, getProductsWithDepartament);
router.get('/:shop/products/departament/:departament/sector/:sector/:slug', cacheInit, getProductsWithDepartamentSector);

module.exports = router;