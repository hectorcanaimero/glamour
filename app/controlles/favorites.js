const cache = require('../middleware/redis');
const { httpError } = require('../helpers/handleError');
const favorites = require('../models/favorites');
const stores = require('../models/stores');

const options = { page: 1, limit: 10, collation: { locale:  'pt'} };

const getFavorite = async (req, res) => {
  try {
    const { cpf, store } = req.params;
    console.log(cpf);
    console.log(store);
    // TODO: REDIS
    const cacheKey = `favorites_cpf_${cpf}_store_${store}`;
    const cachedData = await cache.get(cacheKey);
    if (cachedData) return res.status(200).json(cachedData);
    // TODO: MONGO
    const item = await favorites.findOne({ cpf });
    if(!item) return res.status(404).send({ message: 'Não tem Favoritos' });
    const products = await stores.find({ codLoja: Number(store), host: { $in: item.products } });
    if(!products) return res.status(404).send({ message: 'Não tem produtos pra o CPF' });
    const items = { cpf: item.cpf, products, createdAt: item.createdAt };
    await cache.save(cacheKey, items, 60*60*24);
    res.status(200).send(items);
  } catch (e) { httpError(res, e); }
};

const addFavorite = async (req, res) => {
  try {
    let items = [];
    const { cpf, store, product } = req.body;
    const cacheKey = `favorites_cpf_${cpf}_store_${store}`;
    if (!product && !cpf && !store) return res.status(400).send({ message: 'Faltam dados' });
    items.push(product);
    const item = await favorites.findOne({ cpf });
    if (item) {
      const arr = item.products;
      arr.push(product);
      const existProduct = await favorites.find({ products: { $in: product }, cpf });
      if (existProduct.length > 0) {
        return res.status(201).send({ message: `O Produto já está no favorito` });
      }
      await favorites.updateOne({ cpf }, { products: arr });
    } else {
      await favorites.create({ cpf, products: items });
    }
    const favorite = await favorites.findOne({ cpf });
    const products = await stores.find({ codLoja: store, host: { $in: favorite.products } });
    const results = { cpf, products };
    await cache.save(cacheKey, results, 60*60*24);
    return res.status(201).send(results);
  } catch(e) { httpError(res, e); }
};

const delFavorite = async (req, res) => {
  try {
    const { cpf } = req.params;
    const { product, store } = req.body;
    const cacheKey = `favorites_cpf_${cpf}_store_${store}`;
    if (!product && !cpf) return res.status(400).send({ message: 'Falta dados' });
    const item = await favorites.findOne({ cpf });
    if(!item) return res.status(204).send({ message: 'O CPF não tem produtos favoritos' });
    const arr = item.products;
    const index = arr.indexOf(product);
    if (index > -1) { arr.splice(index, 1); }
    await favorites.updateOne({ cpf }, { products: arr });
    const favorite = await favorites.findOne({ cpf });
    const products = await stores.find({ codLoja: store, host: { $in: favorite.products } });
    const results = { cpf, products };
    await cache.save(cacheKey, results, 60*60*24);
    return res.status(201).send(results);
  } catch(e) { httpError(res, e); }

};

module.exports = { getFavorite, addFavorite, delFavorite };