const model = require('../models/reviews');
const { httpError } = require('../helpers/handleError');

const options = { page: 1, limit: 20, collation: { locale:  'pt'} }

getAll = async (req, res) => {
  const  { page, per_page } = req.query;
  options.page = page || 1;
  options.limit = per_page || 10;
  try {
    const items = await stores.paginate({}, options);
    if (items) return res.status(404).send({ message: 'Erro no carregamento do produto' });
    res.status(200).send(items);
  } catch (e) {
      httpError(res, e);
  }
};

create = async (req, res) => {
  const body = req.body;
  try {
    const exist = await model.findOne({ product: body.product });
    if (exist) return res.status(404).send({ message: 'O Produto já está no cadastro!' });
    const create = await model.create(body);
    console.log(create)
    if (!create) return res.status(404).send({ message: 'O Produto não foi cadastrado!' });
    const item = await model.findById(create._id);
    return res.status(201).send(item);
  }  catch (e) { httpError(res, e); }
};

remove = async(req, res) => {
  const { id } = req.params;
  try {
    const exist = await model.findById(id);
    if (exist) return res.status(404).send({ message: 'O Produto não existe!' });
    const remove = await model.deleteOne({ _id: id});
    if (!remove) return res.status(404).send({ message: 'O Produto não foi apagado!' });
    return res.status(200).send({ message: 'O Produto foi apagado!' });
  } catch (e) {
    httpError(res, e);
  }
};


module.exports = { create, remove, getAll };