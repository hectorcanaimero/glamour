const { httpError } = require('../helpers/handleError');
const stores = require('../models/stores');
const products = require('../models/products');

const options = { page: 1, limit: 10, collation: { locale:  'pt'} };

const countStoreLoja = async (loja) => {
  const count = await stores.count({ codLoja: loja });
  return count;
};

const getItemsStore = async (req, res) => {
  const { shop } = req.params;
  const  { page, per_page } = req.query;
  options.page = page || 1;
  options.limit = per_page || 20;
  try {
    stores.paginate({ 'codLoja': shop }, {}, options);
  } catch (e) {
    httpError(res, e);
  }
};


const getItemHost = async (req, res) => {
  const { shop, host } = req.params;
  try {
    const items = await stores.findOne({ codLoja: shop, host });
    res.status(200).send({ items });
  } catch (e) {
    httpError(res, e);
  }
};

const getItemEAN = async (req, res) => {
  const { shop, ean } = req.params;
  try {
    const items = await products.findOne( { lstEan: { $in: Number(ean) }} );
    if (items) {
      const item = await stores.findOne({ codLoja: shop, host: items.codProduto });
      res.status(200).send({ item });
    } else {
      res.status(403).send({ message: 'No se consiguio' });
    }
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
      mercadologicoWeb: { $elemMatch: { 'departamento.codMercadologico': +departament }}
    }, options);
    res.status(200).send(items);
  } catch (e) { httpError(res, e); }
};

const getProductsWithDepartamentSector = async (req, res) => {
  const { shop, departament, sector, slug } = req.params;
  const  { page, per_page } = req.query;
  options.page = page || 1;
  options.limit = per_page || 20;
  try {
    const items = await stores.paginate({
      codLoja: shop,
      mercadologicoWeb: { $elemMatch: { 'departamento.codMercadologico': +departament, 'setor.codMercadologico': +sector}}
    }, options);
    res.status(200).send(items);
  } catch (e) { httpError(res, e); }
};


const getSearch = async (req, res) => {
  let hosts = [];
  const { shop } = req.params;
  const { search } = req.body;
  const  { page, per_page } = req.query;
  options.page = page || 1;
  options.limit = per_page || 20;
  try {
    const product = await products.find({ $text: {$search: search}});
    if (product) {
      product.forEach(el => hosts.push(el.codProduto));
      const items = await stores.paginate( { codLoja: shop, host: { $in: hosts }}, {}, options );
      console.log(items);
      res.status(200).send(items);
    } else {
      res.status(407).send({ message: `Não se encontro nemhum resultado para ${search}` });
    }
  } catch (e) { httpError(res, e); }
};

module.exports = {
  getSearch,
  getItemEAN,
  getItemHost,
  getItemsStore,
  getItemWithCampanha,
  getProductsWithDepartament,
  getProductsWithDepartamentSector
};