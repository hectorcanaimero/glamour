const { httpError } = require('../helpers/handleError');
const menus = require('../models/menus');

const getMenus = async (req, res) => {
  try {
    const items = await menus.find({});
    res.status(200).send({ items });
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { getMenus };