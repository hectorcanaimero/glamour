const { httpError } = require('../helpers/handleError');
const atacarejo = require('../models/atacarejo');



const getItems = async (req, res) => {
  try {
    const items = await logs.find({});
    res.send({ items });
  } catch (e) {
    httpError(res, e);
  }
};

const getItem = async (req, res) => {
  const { cpfcnpj } = req.params;
  try {
    const item = await atacarejo.findOne({ cpfcnpj: cpfcnpj });
    if (item) { res.status(200).send(item); }
    else { res.status(409).send({message: 'CPF/CNPJ não cadastrado!.'}); }
  } catch(e) { httpError(res, e); }
};

const createItem = async (req, res) => {
  try {
    const { type, cpfcnpj, data, phone, name } = req.body;
    const item = await atacarejo.findOne({ cpfcnpj: cpfcnpj });
    if (!item) {
      const register = await atacarejo.create({ type, cpfcnpj, data, phone, name });
      res.status(200).send({
        name: register.name, phone: register.phone,
        createdAt: register.createdAt, updateAt: register.updateAt, 
        type: register.type, data: register.data, cpfcnpj: register.cpfcnpj,
      });
    } else {
      res.status(409);
      res.send({ error: `O ${ cpfcnpj } j'está cadastrado!`, data: item });
    }
  } 
  catch (e) { httpError(res, e); }
};

module.exports = { getItems, createItem, getItem };