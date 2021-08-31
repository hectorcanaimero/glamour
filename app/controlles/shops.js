const shops = require('../models/shops')
const { httpError } = require('../helpers/handleError')

const options = { page: 1, limit: 20, collation: { locale:  'pt'} }

const getItems = async (req, res) => {
    const  { page, per_page } = req.query
    options.page = page
    options.limit = per_page
    try {
        const items = await shops.paginate({}, options)
        res.send({ data: items })
    } catch (e) {
        httpError(res, e)
    }
}

const getItemsBySlugCidade = async (req, res) => {
    const slug = req.params.slug
    try {
        const items = await shops.find({ 'slug_cidade': slug })
        res.send({ data: items })
    } catch (e) {
        httpError(res, e)
    }
}

const getItemById = async (req, res) => {
    const id = req.params.id
    try {
        const items = await shops.findById(id)
        res.send({ data: items })
    } catch (e) {
        httpError(res, e)
    }
}
const getItemByCode = async (req, res) => {
    const code = req.params.code
    try {
        const items = await shops.findOne({ code })
        res.send({ data: items })
    } catch (e) {
        httpError(res, e)
    }
}
const getItemBySlug = async (req, res) => {
    const slug = req.params.slug
    try {
        const items = await shops.findOne({ slug })
        res.send({ data: items })
    } catch (e) {
        httpError(res, e)
    }
}


module.exports = { getItems, getItemsBySlugCidade, getItemById, getItemByCode, getItemBySlug }