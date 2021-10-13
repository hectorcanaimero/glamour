const { httpError } = require('../helpers/handleError');
const logs = require('../models/logs');



const getItems = async (req, res) => {
  try {
    const items = await logs.find({});
    res.send({ items });
  } catch (e) {
    httpError(res, e);
  }
};

const createItem = async (req, res) => {
  try {
    const { url, status, data, phone, request, response } = req.body;
    const register = await logs.create({ status, url, data, phone, request, response });
    res.status(200).send({
      createdAt: register.createdAt, updateAt: register.updateAt, 
      url: register.url, data: register.data, status: register.status,
      request: register.request, phone: register.phone, response: register.response
    });
  } 
  catch (e) { httpError(res, e); }
};

module.exports = { getItems, createItem };