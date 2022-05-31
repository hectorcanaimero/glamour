
const { dirname, join } = require('path');
const appDir = dirname(require.main.filename);
const finder = require('findit')(join(appDir, 'public', 'images', 'png'));
const { httpError } = require('../helpers/handleError');
const stores = require('../models/stores');

const products = require('../models/products');

const options = { page: 1, limit: 10, collation: { locale:  'pt'} };

const cache = require('../middleware/redis');



const getItemsStore = async (req, res) => {
  try {
    const { shop } = req.params;
    const  { page, per_page } = req.query;
    options.page = page || 1;
    options.limit = per_page || 20;

    // TODO: REDIS
    const cacheKey = `store_${shop}_${options.page}`;
    const cachedData = await cache.get(cacheKey);
    if (cachedData) return res.status(200).json(cachedData);
    // TODO: MONGO
    const items = await stores.paginate({ 'codLoja': shop }, options);
    if (!items) res.status(403).send({ message: 'Data not Found' });
    items.docs.forEach(el => search(el.host));
    await cache.save(cacheKey, items, 60*60*24);
    return res.status(200).send(items);
  } catch (e) {
    httpError(res, e);
  }
};


const getItemHost = async (req, res) => {
  const { shop, host } = req.params;
  try {
    // TODO: REDIS
    const cacheKey = `store_${shop}_host_${host}`;
    const cachedData = await cache.get(cacheKey);
    if (cachedData) return res.status(200).json(cachedData);
    // TODO: MONGO
    const items = await stores.findOne({ codLoja: shop, host });
    if (!items) return res.status(403).send({ message: 'Produto não encontrado' });
    await cache.save(cacheKey, items, 60*60*24);
    return res.status(200).send(items);
  } catch (e) { httpError(res, e); }
};

const getItemEAN = async (req, res) => {
  const { shop, ean } = req.params;
  try {
    // TODO: REDIS
    const cacheKey = `store_${shop}_ean_${ean}`;
    const cachedData = await cache.get(cacheKey);
    if (cachedData) return res.status(200).json(cachedData);
    // TODO: MONGO
    const items = await products.findOne( { lstEan: { $in: Number(ean) }} );
    if (!items) return res.status(403).send({ message: 'Produto não encontrado' });
    const item = await stores.findOne({ codLoja: shop, host: items.codProduto });
    if (!item) return res.status(403).send({ message: 'Não tem estoque nessa Loja' });
    await cache.save(cacheKey, items, 60*60*24);
    return res.status(200).send(item);
  } catch (e) { httpError(res, e); }
};

const getItemWithCampanha = async (req, res) => {
  const { shop } = req.params;
  const  { page, per_page } = req.query;
  options.page = page;
  options.limit = per_page;
  try {
    const items = await stores.find({ codLoja: shop, campanha: { $exists: true } } ).cache();
    res.status(200).send(items);
  } catch (e) {
    httpError(res, e);
  }
};

const getProductsWithDepartament = async (req, res) => {
  try {
    const { shop, departament, slug } = req.params;
    const  { page, per_page } = req.query;
    options.page = page || 1;
    options.limit = per_page || 20;
    // TODO: REDIS
    const cacheKey = `store_${shop}_departament_${departament}_page_${options.page}`;
    const cachedData = await cache.get(cacheKey);
    if (cachedData) return res.status(200).json(cachedData);
    // TODO: MONGO
    const items = await stores.paginate({
      codLoja: shop, mercadologicoWeb: { $elemMatch: { 'departamento.codMercadologico': +departament } }
    }, options);
    if (!items) return res.status(403).send({ message: 'Data not Found' });
    await cache.save(cacheKey, items, 60*60*24);
    return res.status(200).send(items);
  } catch (e) { httpError(res, e); }
};

const getProductsWithDepartamentSector = async (req, res) => {
  try {
    const { shop, departament, sector, slug } = req.params;
    const  { page, per_page } = req.query;
    options.page = page || 1;
    options.limit = per_page || 20;
    // TODO: REDIS
    const cacheKey = `store_${shop}_departament_${departament}_sector_${sector}_page_${options.page}`;
    const cachedData = await cache.get(cacheKey);
    if (cachedData) return res.status(200).json(cachedData);
    // TODO: MONGO
    const items = await stores.paginate({
      codLoja: shop,
      mercadologicoWeb: {
        $elemMatch: { 'departamento.codMercadologico': +departament, 'setor.codMercadologico': +sector }
      }
    }, options);
    await cache.save(cacheKey, items, 60*60*24);
    return res.status(200).send(items);
  } catch (e) { httpError(res, e); }
};


const getSearch = async (req, res) => {
  try {
    let hosts = [];
    const { shop } = req.params;
    const body = req.body;
    const  { page, per_page } = req.query;
    options.page = page || 1;
    options.limit = per_page || 20;
    // TODO: REDIS
    const cacheKey = `store_${shop}_search_${body.search}_page_${options.page}`;
    const cachedData = await cache.get(cacheKey);
    if (cachedData) return res.status(200).json(cachedData);
    // TODO: MONGO
    const product = await products.find({ $text: {$search: body.search}});
    if(!product) return res.status(407).send({ message: `Não se encontro nemhum resultado para ${body.search}` });
    product.forEach(el => hosts.push(el.codProduto));
    const items = await stores.paginate( { codLoja: shop, host: { $in: hosts }}, options );
    await cache.save(cacheKey, items, 60*60*24);
    return res.status(200).send(items);
  } catch (e) { httpError(res, e); }
};

const search = (host) => {
  const item = `${host}.png`;
  finder.on('file',  (item) => { console.log('File: ' + item); });
};

const countStoreLoja = async (loja) => {
  const count = await stores.count({ codLoja: loja });
  return count;
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