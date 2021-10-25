const { httpError } = require('../helpers/handleError');
const favorites = require('../models/favorites');
const stores = require('../models/stores');

const options = { page: 1, limit: 10, collation: { locale:  'pt'} };

const getFavorite = async (req, res) => {
  let items = [];
  const { cpf, store } = req.params;
  try {
    const item = await favorites.findOne({ cpf });
    const products = await stores.find({ codLoja: Number(store), host: { $in: item.products } });
    const items = {
      cpf: item.cpf,
      products,
      createdAt: item.createdAt
    };
    res.status(200).send(items);
  } catch (e) { httpError(res, e); }
};

const addFavorite = async (req, res) => {
  let items = [];
  const { cpf, product } = req.body;
  try {
    if (!product) {
      res.status(404).send({ message: 'Dweve ter um produto pra favoritar' });
    }
    items.push(product);
    const item = await favorites.findOne({ cpf });
    if (item) {
      const arr = item.products;
      arr.push(product);
      await favorites.update({ cpf }, { products: arr });
    } else {
      await favorites.create({ cpf, products: items });
    }
    const fav = await favorites.findOne({ cpf });
    res.status(200).send(fav);
  } catch(e) { httpError(res, e); }
};

module.exports = { getFavorite, addFavorite };