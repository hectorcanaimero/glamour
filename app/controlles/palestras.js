const model = require('../models/palestras');
const { httpError } = require('../helpers/handleError');

getAll = async (req, res) => {
  try {
    const items = await model.find();
    if (!items) return res.status(404).send({ message: 'Erro no carregamento' });
    res.status(200).send(items);
  } catch (e) {
      httpError(res, e);
  }
};

getById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await model.findById(id);
    if (!item) return res.status(404).send({ message: 'Erro no carregamento' });
    res.status(200).send(item);
  } catch (e) {
      httpError(res, e);
  }
};

module.exports = { getAll, getById };