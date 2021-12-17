const { httpError } = require('../helpers/handleError');
const favorites = require('../models/favorites');
const stores = require('../models/stores');

const options = { page: 1, limit: 10, collation: { locale:  'pt'} };

const getFavorite = async (req, res) => {
  const { cpf, store } = req.params;
  try {
    const item = await favorites.findOne({ cpf });
    const products = await stores.find({ codLoja: Number(store), host: { $in: item.products } });
    const items = { cpf: item.cpf, products, createdAt: item.createdAt };
    res.status(200).send(items);
  } catch (e) { httpError(res, e); }
};

const addFavorite = async (req, res) => {
  let items = [];
  const { cpf, store, product } = req.body;
  try {
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
    return res.status(201).send(results);
  } catch(e) { httpError(res, e); }
};

const delFavorite = async (req, res) => {
  const { cpf } = req.params;
  const { product, store } = req.body;
  try {
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
    return res.status(201).send(results);
  } catch(e) { httpError(res, e); }

};

module.exports = { getFavorite, addFavorite, delFavorite };