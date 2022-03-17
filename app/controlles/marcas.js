
const model = require('../models/marcas');
const { httpError } = require('../helpers/handleError');

const getAll = async (req, res) => {
  try {
    const data = await model.find({});
    if(!data) { return res.status(400).send({ message: 'Sem Marcas carregadas' }); }
    return res.status(200).send({ data });
  } catch (e) {
    httpError(res, e);
  }
};

const getFornecedor = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await model.findOne({ fornecedor: id });
    if(!data) { return res.status(400).send({ message: 'Data is not Found' }); }
    return res.status(200).send({ data });
  } catch (e) {
    httpError(res, e);
  }
};

const create = async (req, res) => {
  try {
    const body = req.body;
    if (!body) { return res.status(400).send({ message: 'Body is empty' }); }
    const data = await model.create(body);
    if(!data) { return res.status(400).send({ message: 'Data is not Create' }); }
    return res.status(201).send({ data });
  } catch(e) { httpError(res, e); }
};


module.exports = { getAll, getFornecedor, create };