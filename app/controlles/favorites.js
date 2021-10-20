const { httpError } = require('../helpers/handleError');
const favorites = require('../models/favorites');

const options = { page: 1, limit: 10, collation: { locale:  'pt'} };

const getItems = async (req, res) => {
  const { idCliente } = req.params;
  const  { page, per_page } = req.query;
  options.page = page || 1;
  options.limit = per_page || 20;
  try {
    const items = await favorites.paginate({ idCliente }, options);
    res.status(200).send(items);
  } catch (e) { httpError(res, e); }
};

async function createItem(req, res) {
  try {
    const { idCliente, product } = req.body;
    const item = await favorites.findOne({ 'product.codProduto': product.codProduto });
    if (!item) {
      const register = await favorites.create({ idCliente, product });
      res.status(200).send({
        idCliente: register.idCliente, product: register.product,
        createdAt: register.createdAt, updateAt: register.updateAt
      });
    } else {
      res.status(409);
      res.send({ error: `já está cadastrado!`, data: item });
    }
  }
  catch (e) { httpError(res, e); }
}


module.exports = { getItems, createItem };