const model = require('../models/clients');
const palestraModel = require('../models/palestras');
const { httpError } = require('../helpers/handleError');

const options = { page: 1, limit: 20, collation: { locale:  'pt'} }

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

getByPalestra = async (req, res) => {
  const { palestra } = req.params;
  try {
    const item = await model.find({ palestra });
    if (!item) return res.status(404).send({ message: 'Erro no carregamento' });
    res.status(200).send(item);
  } catch (e) {
      httpError(res, e);
  }
};

getAllPalestra = async (req, res) => {
  const { palestra } = req.params;
  try {
    const item = await palestraModel.find({});
    if (!item) return res.status(404).send({ message: 'Erro no carregamento' });
    res.status(200).send(item);
  } catch (e) {
      httpError(res, e);
  }
};

getPalestraId = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await palestraModel.findById(id);
    if (!item) return res.status(404).send({ message: 'Erro no carregamento' });
    res.status(200).send(item);
  } catch (e) {
      httpError(res, e);
  }
};

getByReceita= async (req, res) => {
  try {
    const item = await model.find({ palestra: null });
    if (!item) return res.status(404).send({ message: 'Erro no carregamento' });
    res.status(200).send(item);
  } catch (e) {
      httpError(res, e);
  }
};

getByCpfPalestra = async (req, res) => {
  const { cpf, palestra } = req.params;
  try {
    const item = await model.findOne({cpf, palestra});
    if (!item) return res.status(404).send({ message: 'Erro no carregamento' });
    res.status(200).send(item);
  } catch (e) {
      httpError(res, e);
  }
};

getByCpfReceita = async (req, res) => {
  const { cpf } = req.params;
  try {
    const item = await model.findOne({cpf, palestra: null});
    if (!item) return res.status(404).send({ message: 'Erro no carregamento' });
    res.status(200).send(item);
  } catch (e) {
      httpError(res, e);
  }
};


createPalestra = async (req, res) => {
  const body = req.body;
  try {
    const create = await model.create(body);
    if (!create) return res.status(404).send({ message: 'O Produto não foi cadastrado!' });
    const item = await model.findById(create._id);
    return res.status(201).send(item);
  }  catch (e) { httpError(res, e); }
};


createReceita = async (req, res) => {
  console.log(req);
  const body = req.body;
  try {
    const create = await model.create(body);
    if (!create) return res.status(404).send({ message: 'O Produto não foi cadastrado!' });
    const item = await model.findById(create._id);
    return res.status(201).send(item);
  }  catch (e) { httpError(res, e); }
};


validateCadastroPalestra = async (req, res) => {
  const { id } = req.params;
  try {
    const { quantidade } = await palestraModel.findById(id);
    console.log('QTD PALESTRA ', quantidade);
    const qtd = await model.count({ palestra: id });
    console.log('QTD REGISTER ', qtd);
    if (quantidade >=qtd) return res.status(404).send({ status: false, message: 'A Palestra está cheia!' });
    return res.status(200).send({status: true, message: 'ainda temos vaga pra está palestra!'});
  }
  catch (e) {
    httpError(res, e);
  }
};

validateCadastroReceitas = async (req, res) => {
  try {
    const qtd = await model.count({ palestra: null });
    if (50 >=qtd) return res.status(404).send({ status: false, message: 'A Campanha da receita acabou!' });
    return res.status(200).send({status: true, message: 'ainda temos vaga pra se cadastrar!'});
  }
  catch (e) {
    httpError(res, e);
  }
};


module.exports = {
  createPalestra, createReceita, getAll, getById, getPalestraId,
  getByPalestra, getByReceita, getByCpfPalestra, getByCpfReceita,
  validateCadastroPalestra, validateCadastroReceitas, getAllPalestra
};