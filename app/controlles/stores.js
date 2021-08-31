const { httpError } = require('../helpers/handleError')
const stores = require('../models/stores')

const options = { page: 1, limit: 10, collation: { locale:  'pt'} }

const getItemsByShop = async (req, res) => {
  const { shop } = req.params
  const  { page, per_page } = req.query
  options.page = page
  options.limit = per_page
  try {
    const items = await stores.paginate({ 'codLoja': shop }, options )
    res.send({ data: items })
  } catch (e) {
    httpError(res, e)
  }
}


const getItemByShopHost = async (req, res) => {
  const { shop, host } = req.params
  try {
    const items = await stores.findOne({ codLoja: shop, host })
    res.send({ data: items })
  } catch (e) {
    httpError(res, e)
  }
}

getItemWithCampanha = async (req, res) => {
  const { shop } = req.params
  const  { page, per_page } = req.query
  options.page = page
  options.limit = per_page
  try {
    const items = await stores.find({ codLoja: shop, campanha: { $exists: true } } )
    res.send({ data: items })
  } catch (e) {
    httpError(res, e)
  }
}


module.exports = { getItemsByShop, getItemByShopHost, getItemWithCampanha }