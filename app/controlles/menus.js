const { httpError } = require('../helpers/handleError');
const menus = require('../models/menus');

const getMenus = async (req, res) => {
  try {
    const items = await menus.find({});
    res.status(200).send(items);
  }
  catch (e) { httpError(res, e); }
};
  const getMenusBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
      const items = await menus.find({slug});
      if (!items)  return res.status(400).send({ message: 'Data is not Found!' });
      return res.status(200).send(items[0]);
    }
    catch (e) { httpError(res, e); }
};

const getMenusByCode = async (req, res) => {
    const { code } = req.params;
    try {
      const items = await menus.find({codMercadologico: code});
      if (!items)  return res.status(400).send({ message: 'Data is not Found!' });
      return res.status(200).send(items);
    }
    catch (e) { httpError(res, e); }
};

module.exports = { getMenus, getMenusBySlug, getMenusByCode };