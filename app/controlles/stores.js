const { httpError } = require('../helpers/handleError');
const stores = require('../models/stores');

const options = { page: 1, limit: 10, collation: { locale:  'pt'} };

const getItemsByShop = async (req, res) => {
  const { shop } = req.params;
  const  { page, per_page } = req.query;
  options.page = page || 1;
  options.limit = per_page || 10;
  try {
    const items = await stores.paginate({ 'codLoja': shop }, options );
    res.status(200).send({ data: items});
  } catch (e) {
    httpError(res, e);
  }
};


const getItemByShopHost = async (req, res) => {
  const { shop, host } = req.params;
  try {
    const items = await stores.findOne({ codLoja: shop, host });
    res.status(200).send({ items });
  } catch (e) {
    httpError(res, e);
  }
};

const getItemWithCampanha = async (req, res) => {
  const { shop } = req.params;
  const  { page, per_page } = req.query;
  options.page = page;
  options.limit = per_page;
  try {
    const items = await stores.find({ codLoja: shop, campanha: { $exists: true } } );
    res.status(200).send({ data: items });
  } catch (e) {
    httpError(res, e);
  }
};

const getProductsWithDepartament = async (req, res) => {
  const { shop, departament, slug } = req.params;
  const  { page, per_page } = req.query;
  options.page = page || 1;
  options.limit = per_page || 20;
  try {
    const items = await stores.paginate({
      codLoja: shop, 
      mercadologicoWeb: { '$elemMatch': { 'departamento.codMercadologico': +departament }}
    }, options);
    res.status(200).send(items);
  } catch (e) { httpError(res, e); }
}

const getProductsWithDepartamentSector = async (req, res) => {
  const { shop, departament, sector, slug } = req.params;
  const  { page, per_page } = req.query;
  options.page = page || 1;
  options.limit = per_page || 20;
  try {
    const items = await stores.paginate({
      codLoja: shop,
      mercadologicoWeb: { '$elemMatch': { 'departamento.codMercadologico': +departament, 'setor.codMercadologico': +sector}}
    }, options);
    res.status(200).send(items);
  } catch (e) { httpError(res, e); }
}

module.exports = {
  getItemsByShop,
  getItemByShopHost,
  getItemWithCampanha,
  getProductsWithDepartament,
  getProductsWithDepartamentSector
};