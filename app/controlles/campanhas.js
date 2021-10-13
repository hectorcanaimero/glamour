
const { httpError } = require('../helpers/handleError');
const campanhas = require('../models/campanhas');

const options = { page: 1, limit: 10, collation: { locale:  'pt'} };

const getItems = async (req, res) => {
  const  { page, per_page } = req.query;
  options.page = page;
  options.limit = per_page;
  try {
    const items = await campanhas.paginate({}, options);
    res.send({ data: items });
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { getItems };