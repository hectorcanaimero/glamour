const { generate } = require('short-uuid');
const moment = require('moment');

const urlModel = require('../models/url');
const { httpError } = require('../helpers/handleError');

const options = { page: 1, limit: 20, collation: { locale:  'pt'} };

getItems = async (req, res) => {
  const  { page, per_page } = req.query;
  options.page = page || 1;
  options.limit = per_page || 10;
  try {
      const items = await urlModel.find({});
      res.send({ items });
  } catch (e) {
      httpError(res, e);
  }
};

getRedirect = async (req, res) => {
  const { shorty } = req.params;
  try {
    const item = await urlModel.findOne({ shorty });
    if(item) {
      item.count = item.count + 1;
      item.save();
      res.redirect(item.url);
    } else {
      res.status(409);
      res.send({ error: 'URL Não existe' });
    }
    res.send({ data: items });
  } catch (e) {
    httpError(res, e);
  }
};

createUrl = async (req, res) => {
  let short;
  const { url, shorty } = req.body;
  try {
    if (shorty) { short = shorty; } 
    else { short = generate().slice(0, 4); }
    const item = await urlModel.findOne({ shorty: short });
    if (!item) {
      const create = await urlModel.create({ url, count: 0, shorty: short });
      res.status(200);
      res.send({
        url: create.url, shorty: create.shorty,
        createdAt: create.createdAt, updateAt: create.updateAt 
      });
    } else {
      res.status(409);
      res.send({ error: 'O Short existe', data: item2 });
    }
  }  catch (e) { httpError(res, e); }
};

removeItem = async(req, res) => {
  const { shorty } = req.params;
  try {
    const item = await urlModel.findOne({ shorty });
    if (item) {
      const remove = await urlModel.deleteOne({ shorty });
      res.send({ mensagem: 'O Iten foi removido' });
    } else {
      res.status(409);
      res.send({ mensagem: 'Não foi apagado o iten' });
    }
  } catch (e) {
    httpError(res, e);
  }
};

updateItem = async (req, res) => {
  const { id } = req.params;
  const { url, shorty } = req.body;
  try {
    const item = await urlModel.findById(id);
    if (item) {
      item.url = url;
      item.shorty = shorty;
      item.save();
      res.status(200);
      res.send({
        url: item.url, shorty: item.shorty,
        createdAt: item.createdAt, updateAt: item.updateAt 
      });
    } else {
      res.status(409);
      res.send({ mensagem: 'Não se atualizo o iten' });
    }
  } catch(e) {
    httpError(res, e);
  }
};

module.exports = { createUrl, getRedirect, getItems, removeItem, updateItem };